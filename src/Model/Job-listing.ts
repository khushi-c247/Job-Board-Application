import mongoose from "mongoose"
const job = new mongoose.Schema({
    type: {
        type: String,
        require: true
    },
    
    salary : {
        type : Number,
        require: true
    }
})

export default mongoose.model("job" , job)