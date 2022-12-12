import UsersModel from "#components/users/users-model.js";
import Joi from "joi";
import argon2 from "argon2";
import {sendWelcomeMail} from "#services/mailing/welcome-email.js";

export async function register(ctx) {
    try {
        const registerValidationSchema = new Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            terms_and_conditions: Joi.boolean().valid(true).required(),
        });

        const params = ctx.request.body;
        const { error, value } = registerValidationSchema.validate(params);
        if(error) throw new Error(error);

        const hashPassword = await argon2.hash(value.password);
        const newUser = new UsersModel({
            ...value,
            password: hashPassword,
            settings: {
                terms_and_conditions: value.terms_and_conditions
            }
        });

        newUser.generateEmailVerificationToken();
        const user = await newUser.save();

        await sendWelcomeMail(user, user.settings.validation_mail_token);

        ctx.ok(user.generateJWT());
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function login (ctx) {
    try {
        const registerValidationSchema = new Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        });

        const params = ctx.request.body;
        const { error, value } = registerValidationSchema.validate(params);
        if(error) throw new Error(error);

        const potentialUserPassword = await UsersModel.find({email: params.email},  {email: 1,password: 1});

        if(!potentialUserPassword[0]) throw new Error("Identifiant ou mot de passe incorrect");
        
        if(!(await argon2.verify(potentialUserPassword[0].password, params.password))) throw new Error("Identifiant ou mot de passe incorrect");

        const user = UsersModel(
            ...potentialUserPassword
        );
        ctx.ok(user.generateJWT());
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function profile(ctx) {
    try {
        ctx.ok(ctx.state.user);
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function editProfile(ctx) {
    try {
        const editUserValidationSchema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required()
            });


        const params = ctx.request.body;
        const { error } = editUserValidationSchema.validate(params);
        if(error) throw new Error(error);

        const userWithMail = await UsersModel.find({email: params.email},  {email: 1});

        if(userWithMail[0] && userWithMail[0].email !== ctx.state.user.email) throw new Error("Modification du mail impossible: email déja utiliser.");
        const hashPassword = await argon2.hash(params.password);

        ctx.state.user.password = hashPassword;
        ctx.state.user.email = params.email;

        await UsersModel.updateOne({_id: ctx.state.user._id}, {$set: ctx.state.user});
        ctx.ok();

    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}