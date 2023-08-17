import { job } from "../interfaces/interfaces";
import mongoose from "mongoose"
const Job = new mongoose.Schema<job>({
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
        type: [String]
    }
})

export default mongoose.model<job>("Job", Job)