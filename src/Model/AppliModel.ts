import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type : String,
        require: true,
        unique: true
    }
})

export default mongoose.model("application" , applicationSchema)