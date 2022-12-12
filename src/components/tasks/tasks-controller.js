import tasksModel from "#components/tasks/tasks-model.js";
import listesModel from "#components/list/listes-model.js";
import Joi from "joi";

export async function getAll(ctx) {
    try {
        ctx.body = await tasksModel.find({createBy: ctx.state.user.id})
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function getAllByListId(ctx) {
    try {
        if(!ctx.params.listId) throw new Error("No id supplied");
        const list = await listesModel.find({_id: ctx.params.listId});
        if(!list[0] || list[0].createBy.toString() !== ctx.state.user.id) {
            ctx.unauthorized();
            return;
        }

        const tasks = await tasksModel.findByListId(ctx.params.listId);
        ctx.ok(tasks);
    } catch (e) {
        ctx.badRequest({message: e.message});
    }
}

export async function getOne(ctx) {
    try {
        const task = await tasksModel.findById(ctx.params.id);

        if(ctx.state.user.id !== task.createBy.toString()) {
            ctx.unauthorized();
            return;
        }

        ctx.ok(task);
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function create(ctx) {
    try {
        const tasksValidationSchema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().max(255),
            list: Joi.string().required(),
            done: Joi.boolean().required()
        });

        const { error } = tasksValidationSchema.validate(ctx.request.body);
        if(error) throw new Error(error);

        let tasksObj = ctx.request.body;
        tasksObj.createBy = ctx.state.user.id;

        await tasksModel.create(tasksObj);
        ctx.response.status = 201;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function edit(ctx) {
    try {
        const tasksValidationSchema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().max(255),
            list: Joi.string().required(),
            done: Joi.boolean().required()
        });

        const { error } = tasksValidationSchema.validate(ctx.request.body);
        if(error) throw new Error(error);

        let task = await tasksModel.find({_id: ctx.params.id});
        if(task[0].createBy.toString() !== ctx.state.user.id) {
            ctx.unauthorized();
            return;
        }

        let tasksObj = ctx.request.body;

        await tasksModel.updateOne({_id: ctx.params.id}, {$set: tasksObj});
        ctx.response.status = 200;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function remove(ctx) {
    try {
        const task = await tasksModel.find({_id: ctx.params.id});

        if(!task[0] || task[0].createBy.toString() !== ctx.state.user.id) {
            ctx.unauthorized();
            return;
        }

        await tasksModel.findOneAndRemove({_id: ctx.params.id});
        ctx.response.status = 200;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}