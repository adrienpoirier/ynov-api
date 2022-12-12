import listeModel from "#components/list/listes-model.js";
import Joi from "joi";
import tasksModel from "#components/tasks/tasks-model.js";

export async function getAll(ctx) {
    try {
        ctx.body = await listeModel.find({createBy: ctx.state.user.id});
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function getOne(ctx) {
    try {
        let liste = await listeModel.findById(ctx.params.id).lean();
        if(liste.createBy.toString() !== ctx.state.user.id) {
            ctx.unauthorized();
            return;
        }

        liste.tasks = await tasksModel.findByListId(ctx.params.id);

        ctx.body = liste;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function create(ctx) {
    try {
        const listeValidationSchema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().optional()
        });

        const { error } = listeValidationSchema.validate(ctx.request.body);
        if(error) throw new Error(error);

        let listeObj = ctx.request.body;
        listeObj.createBy = ctx.state.user.id;

        await listeModel.create(listeObj);
        ctx.response.status = 201;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function edit(ctx) {
    try {
        const listeValidationSchema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().optional(),
        });

        const { error } = listeValidationSchema.validate(ctx.request.body);
        if(error) throw new Error(error);

        const liste = await listeModel.find({_id: ctx.params.id});

        if(!liste[0] || liste[0].createBy.toString() !== ctx.state.user.id) {
            ctx.unauthorized();
            return;
        }

        let exempleObj = ctx.request.body;

        await listeModel.updateOne({_id: ctx.params.id}, {$set: exempleObj});
        ctx.response.status = 200;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function remove(ctx) {
    try {
        const liste = await listeModel.find({_id: ctx.params.id});

        if(!liste[0] || liste[0].createBy.toString() !== ctx.state.user.id) {
            ctx.unauthorized();
            return;
        }

        await listeModel.findOneAndRemove({_id: ctx.params.id});
        await tasksModel.deleteMany()
        ctx.response.status = 200;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}