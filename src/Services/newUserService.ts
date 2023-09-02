import User from "../Model/UserModel";
import Job from "../Model/JobModel";
import { newUser, Loginbody, reqUser, job } from "../interfaces/interfaces";
import jwt from "jsonwebtoken";
import { resetPasswordMailer } from "../Mailer/applicaintMailer";
import { Request, Response } from "express";

// Create a new User to DataBase
const createNewUser = async (obj: newUser) => {
  const user = await User.create(obj);
  return user;
};

//Forgot Password
const passwordService = async (resetobj: { user: string; email: string }) => {
  const user = await User.findOne({ email: resetobj.email });
  if (user) {
    const token = jwt.sign({ email: resetobj.email }, "secret", {
      expiresIn: "2h",
    });
    resetPasswordMailer(user.name, resetobj.email, token);
    return true;
  } else {
    return false;
  }
};
//Reset password
const resetService = async (user: reqUser, passwordObj: any) => {
  const id = user._id!;
  const userPassword = await User.findByIdAndUpdate(id, { ...passwordObj });
  return userPassword;
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

const deleteUser = async (user: reqUser) => {
  try {
    //   const id = user._id
    //   const jobs = await Job.aggregate([
    //     {$match: {applicantsId : id }}
    //   ])

    //  Job.findByIdAndDelete()

    //   console.log(jobs);

    const res = await Job.find();

    // await User.findByIdAndDelete(id);
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
