import { job } from "../interfaces/interfaces";
import mongoose, { Schema , AggregatePaginateModel } from "mongoose"
import mongoosePaginate from "mongoose-aggregate-paginate-v2"
const Job = new Schema<job>({
    title: {
        type: String,
        require: true,
        unique: true
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
        type: [mongoose.Types.ObjectId],
        ref : "User"
    }
})

Job.plugin(mongoosePaginate)

export default mongoose.model<job,AggregatePaginateModel<job>>("Job", Job);

