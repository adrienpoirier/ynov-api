import mongoose from 'mongoose'

const {Schema} = mongoose

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    created_at: {
        type: [String],
        required: true
    },
    updated_at: {
        type: Number,
        required: true
    }
    
})

const Task = mongoose.model('Task', TaskSchema)

Task.create({
    title: 'Test product',
    description: 'test',
    created_at: ['black', 'blue'],
    updated_at: 1000
})

const findAll = async () => {
    const task = await Task.find()
    console.log(task)
}

const findById = async () => {
    const task = await Task.findById('63721b615519cfc0d94fe535')
    console.log(task._id)
}

const updateById = async () => {
    const task = await Task.findById('63721b615519cfc0d94fe535')
    task.set({
        name: "modification"
    })
    task.save()

    console.log(task._id)
}

const deleteById = async () => {
    const exemple = findByIdAndDelete('63721b615519cfc0d94fe535')
}

Task.create()
export default Task