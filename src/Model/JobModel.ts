import { job } from "../interfaces/interfaces";
import mongoose, { Schema } from "mongoose"
import mongoosePaginate from "mongoose-aggregate-paginate-v2"
const Job = new Schema<job>({
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
        type: [mongoose.Types.ObjectId],
        ref : "User"
    }
})

// interface AggregatePaginateModel<T extends Document> extends Model<T> {
//     aggregatePaginate(
//       query?: mongoose.Aggregate<T>,
//       options?: PaginateOptions,
//       callback?: (err: any, result: AggregatePaginateResult<T>) => void
//     ): Promise<AggregatePaginateResult<T>>;
//   }
Job.plugin(mongoosePaginate)

export default mongoose.model<job>("Job", Job)

