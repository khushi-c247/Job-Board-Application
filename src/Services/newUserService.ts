import User from '../Model/UserModel'
import { newUser, Loginbody } from '../interfaces/interfaces'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'

// Create a new User to DataBase
const createNewUser = async (obj: newUser) => {
  obj.password = await bcrypt.hash(obj.password, 10)
  await User.create(obj)
  return "User Created"
}

//Login
const login = async (req: Request, res: Response) => {
  const userReqBody: Loginbody = req.body; 
  const loginUser: newUser | null = await User.findOne({ email: userReqBody.email });
  
  //Check if user exists
  if (!loginUser) {
    return res.send("User not found");
  }

  //Bycript password and match
  const passwordMatch = await bcrypt.compare(userReqBody.password, loginUser.password);
  if (!passwordMatch) {
    return res.send("Incorrect password");
  }

  //Generate Token
  const token = jwt.sign(
    { email: loginUser?.email, name: loginUser.name }, "secret", { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
};

export { createNewUser,  login };