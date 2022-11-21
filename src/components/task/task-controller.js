import Task from '#components/task/task-model.js'
import Joi from 'joi'
export async function index(ctx){
    try{
        ctx.body = await Task.find({})
    } catch(e){
        ctx.badRequest({message: e.message})
    }
    
}

export async function getOne(ctx){
    try{
        ctx.body = await Task.find({'_id': ctx.params.id})
    } catch(e){
        ctx.badRequest({message: e.message})
    }
    
}

export async function create(ctx){
    try{
        const taskValidationSchema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().optional(),
            created_at: Joi.number().required(),
            updated_at: Joi.array().has(Joi.string().optional()).optional()
        })
        
        const {error} = taskValidationSchema.validate(ctx.request.body)
        if (error) throw new Error(error)

        taskValidationSchema.validate(ctx.request.body)
        ctx.body = await Task.find({})
    } catch(e){
        ctx.badRequest({message: e.message})
    }
    
}

export async function deleteOne(ctx){
    try{
        const deleteTask = await Task.findOneAndRemove({'_id': ctx.params.id})
    }
    catch(e){
        ctx.badRequest({message: e.message})
    }
    ctx.status = 200
}

export async function edit(ctx) {
    try {
    const exempleValidationSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string().max(255),
    created_at: Joi.number().required(),
    updated_at: Joi.array().has(Joi.string().optional()).optional()
    });
    const { error } = exempleValidationSchema.validate(ctx.request.body);

    if(error) throw new Error(error);
        let exempleObj = ctx.request.body;
        exempleObj.updated_at = Date.now(); 
        await exemplesModel.updateOne({_id: ctx.params.id}, {$set: exempleObj});
        ctx.response.status = 200;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

