import mongoose from "mongoose"
const Jobschema = new mongoose.Schema({
    type: {
        type: String,
        require: true
    },
    
    salary : {
        type : Number,
        require: true
    }
})

export default mongoose.model("job" , Jobschema)