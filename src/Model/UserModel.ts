import { newUser } from "../interfaces/interfaces";
import mongoose, { Schema } from "mongoose";
// import JobModel from "./JobModel";
const User = new mongoose.Schema<newUser>({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password : {
        type : String,
        require : true
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
        type: [Schema.Types.ObjectId],
        ref: "Job"
    },
    role :{
        type : String,
        enum : ["admin" , "normal"],
        default: "normal"
    },

  
})
// user -> User
export default mongoose.model<newUser>("User", User)