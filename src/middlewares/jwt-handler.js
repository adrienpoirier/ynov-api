import KoaJWT from "koa-jwt";
import UsersModel from "../components/users/users-model.js";
import compose from "koa-compose";

export const isAuhtentificated = KoaJWT({
    secret: process.env.JWT_SECRET,
});

export const resovleUserFromJWT = async function(ctx, next) {
    try {
        const user = await UsersModel.findById(ctx.state.user.id);
        ctx.state.user = user;
        return next();
    } catch (e) {
        ctx.unauthorized({message: e.message});
    }
}

export const isAuthentificatedWithUser = compose([isAuhtentificated, resovleUserFromJWT]);