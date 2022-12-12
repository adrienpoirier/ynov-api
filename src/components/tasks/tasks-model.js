import mongoose from "mongoose";

const { Schema } = mongoose;

const tasksSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    list: {
        type: Schema.Types.ObjectId,
        ref: "Liste",
        required: true
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    },
    createBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, {
        timestamps: true
    });


tasksSchema.static({
    async findByListId(listId) {
        return this.find({list: listId});
    }
});

const tasksModel = mongoose.model('Tasks', tasksSchema);

export default tasksModel;