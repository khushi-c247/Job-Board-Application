import mongoose from "mongoose";
const user = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    experience: {
        type: Number,
        require: true,
    },
    discription: {
        type: String,
        require: true,
    },
    graduationYear: {
        type: Number,
        require: true
    },
    appliedTo: {
        type: [String],
        unique: true
    }
})

export default mongoose.model("user", user)