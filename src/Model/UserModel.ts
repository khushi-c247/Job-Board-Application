import mongoose from "mongoose";
const user = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type : String,
        require: true,
        unique: true
    },
    experience : {
        type : String,
        require : true,
    }
      
})

export default mongoose.model("user" , user)