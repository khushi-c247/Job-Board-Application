import User from "../Model/UserModel";
import { newUser, Loginbody } from "../interfaces/interfaces";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

// Create a new User to DataBase
const createNewUser = async (obj: newUser) => {
  await User.create(obj);
  return "User Created";
};

//Update an existing User
const updateUser = async (user: any ,id: string, obj: newUser) => {
  try {
    
  if(user._id!=id){    
     throw new Error("User not match");
  }
    const updated = await User.findByIdAndUpdate(id, { ...obj });
    if (!updated) {
      return "User not found";
    }
    return updated;
  } catch (error) {
    console.log(error);
  }
  return "User Updated"
};

const deleteUser =  async (user:any , id :string) => {
  try {
    if(user._id!=id){    
       throw new Error("User not match");
    }
    await User.findByIdAndDelete(id)
    return
  }
  catch (error) {
    console.log(error);
  }

}

//Login
const login = async (req: Request, res: Response) => {
  const userReqBody: Loginbody = req.body;
  const loginUser: newUser | null = await User.findOne({
    email: userReqBody.email,
  });

  //Check if user exists
  if (!loginUser) {
    return res.send("User not found");
  }
  //Bcrypt password match
  const passwordMatch = await loginUser.checkPassword(userReqBody.password);

  if (!passwordMatch) {
    return res.status(401).json({message:"You have enterd wrong password!"}); //Chance condition
  }
  // Generate Token
  const token = jwt.sign(
    { email: loginUser?.email, name: loginUser.name },
    "secret",
    { expiresIn: "1h"}
  );
  res.json({ message: "Login successful", token });
};

export { createNewUser, login, updateUser , deleteUser};
