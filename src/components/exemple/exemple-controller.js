import Exemple from '#components/exemple/exemple-model.js'
import Joi from 'joi'

export async function index(ctx){
    try{
        ctx.body = await Exemple.find()
    } catch(e){
        ctx.badRequest({message: e.message})
    }
    
}

export async function create(ctx){
    try{
        const exempleValidationSchema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().optional(),
            price: Joi.number().required(),
            color: Joi.array().has(Joi.string().optional()).optional()
        })
        
        const {error} = exempleValidationSchema.validate(ctx.request.body)
        if (error) throw new Error(error)

        exempleValidationSchema.validate(ctx.request.body)
        ctx.body = await Exemple.find({})
    } catch(e){
        ctx.badRequest({message: e.message})
    }
    
}

export async function deleteOne(ctx){
    try{
        const deleteExemple = await Exemple.findOneAndRemove({'_id': ctx.params.id})
    }
    catch(e){
        ctx.badRequest({message: e.message})
    }
    ctx.status = 200
}

export async function updateOne(ctx){
    await Exemple 
}