import mongoose from "mongoose"
const job = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    discription: {
        type: String,
        require: true
    },

    requirements: {
        type: String,
        require: true
    },

    salary: {
        type: Number,
        require: true
    }, 
    applicantsId: {
        type: [String],

    }
})

export default mongoose.model("job", job)