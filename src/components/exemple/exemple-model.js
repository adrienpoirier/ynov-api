import mongoose from 'mongoose'

const {Schema} = mongoose

const exempleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    color: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    }
    
})

const Exemple = mongoose.model('Exemple', exempleSchema)

Exemple.create({
    name: 'Test product',
    description: 'test',
    color: ['black', 'blue'],
    price: 1000
})


const updateById = async () => {
    const exemple = await Exemple.findById('63721b615519cfc0d94fe535')
    exemple.set({
        name: "modification"
    })
    exemple.save()

    console.log(exemple._id)
}

export default Exemple