import { NextFunction } from "express";
import { newUser } from "../interfaces/interfaces";
import mongoose, { Schema,AggregatePaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-aggregate-paginate-v2"
import bcrypt from "bcryptjs";

// import JobModel from "./JobModel";
const UserModel = new mongoose.Schema<newUser>({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
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
    require: true,
  },
  appliedTo: {
    type: [Schema.Types.ObjectId],
    ref: "Job",
  },
  role: {
    type: String,
    enum: ["admin", "normal"],
    default: "normal",
  },
});

UserModel.pre('save', async function(next) {
  if (!this.isModified('password')) {
   next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next
 })
 UserModel.pre(['findOneAndUpdate'] , function (next){
  let update : any = { ...this.getUpdate()}
  console.log();

  if(update.password) {
    bcrypt.genSalt(10, (err, salt )=>{
      if(err) {
        console.log(err);
      }
      bcrypt.hash(update.password, salt,(err,hash)=>{
        if(err) {
          console.log(err);
        }
        update.password = hash;
        this.setUpdate(update);
        next();
      });
    });
  }
else{
  next()
}})

UserModel.methods.checkPassword=  async function (candidatePassword: string){
      return await bcrypt.compare(candidatePassword, this.password);
}
UserModel.plugin(mongoosePaginate)

export default mongoose.model<newUser,AggregatePaginateModel<newUser>>("User", UserModel);
