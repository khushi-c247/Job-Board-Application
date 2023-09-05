import User from "../Model/UserModel";
import Job from "../Model/JobModel";
import {ParsedQs} from 'qs'
import { newUser, Loginbody, reqUser, job } from "../interfaces/interfaces";
import jwt from "jsonwebtoken";
import { resetPasswordMailer } from "../Mailer/applicaintMailer";
import { Request, Response } from "express";


import Queue from "bull";
import {passwordChanged} from '../Mailer/applicaintMailer'
// Create a new User to DataBase
const createNewUser = async (obj: newUser) => {
  const scheduler = new Queue('createUserQueue');
  const main = async () => {
  await scheduler.add(await User.create(obj));
  };

  const res = scheduler.process((job, done) => {
   done();
  console.log(job.data) 
});
// scheduler.on('compleate', () => {
//  console.log('done');
 
// })

main().catch(console.error); 

};
let token :string ;
//Forgot Password
const passwordService = async (resetobj: { email: string }) => {
  const userdetails = await User.findOne({ email: resetobj.email });
   if (userdetails) {
    const token = jwt.sign({ email: resetobj.email }, "secret", {
      expiresIn: "1h",
    });
    console.log(userdetails);
    
    resetPasswordMailer(userdetails.name, resetobj.email, token);
    return true;
  } else {
    return false;
  }
};
//Reset password
const resetService = async (user: reqUser, passwordObj: { password :string, confirmPassword: string},token:string|undefined) => {

  const id = user._id!;
  passwordChanged(user.email)

  const userdetails = await User.findById(id)
   if(userdetails?.token !== token)
   {
    const userPassword = await User.findByIdAndUpdate(id, { ...passwordObj, token:token});
    return true;
  }
   else{
    return false;
   }
    
};

//Update an existing User
const updateUser = async (user: reqUser, obj: newUser) => {
  try {
    const id = user._id!;
    const updated = await User.findByIdAndUpdate(id, { ...obj });
    if (!updated) {
      return "User not found";
    }
    return updated;
  } catch (error) {
    console.log(error);
  }
  return "User Updated";
};

//Delete an existing User
const deleteUser = async (user: reqUser) => {
  try {
    const id = user._id
    await User.findByIdAndDelete(id);
    return;
  } catch (error) {
    console.log(error);
  }
};

//Login
const login = async (req: Request, res: Response) => {
  const userReqBody: Loginbody = req.body;
  const loginUser: newUser | null = await User.findOne({
    email: userReqBody.email,
  });

  //Check if user exists
  if (!loginUser) {
    return res.status(401).json({ message: "User not found" });
  }
  //Bcrypt password match
  const passwordMatch = await loginUser.checkPassword(userReqBody.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "You have enterd wrong password!" }); //Chance condition
  }
  // Generate Token
  const token = jwt.sign(
    { email: loginUser?.email, name: loginUser.name },
    "secret",
    { expiresIn: "1h" }
  );
  res.json({ message: "Login successful", token });
};

export {
  createNewUser,
  login,
  updateUser,
  deleteUser,
  passwordService,
  resetService,
};
