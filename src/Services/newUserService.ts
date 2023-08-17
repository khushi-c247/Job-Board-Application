import User from '../Model/UserModel'
import { newUser , body } from '../interfaces/interfaces'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs' 
import { Request , Response } from 'express'
import { validationResult } from 'express-validator'


// Create a new User to DataBase
const createNewUser = async (obj : newUser)=>{
    try {
      obj.password = await bcrypt.hash(obj.password ,10)
        await User.create(obj)
        return "User Created"
    } catch (error) {
        console.log(error);  
        
    }

}
//user get
const getUser = async (obj: body): Promise <newUser | null> =>{
    // console.log(authUser);
    const getUser : newUser | null = await User.findOne({email:obj.email}) 
    // console.log(getUser);
    return getUser;
}



const login = async (req: Request, res: Response) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const arrayOfErr = result.array();
        return res.send(arrayOfErr[0])
      }
      const userReqBody: body = req.body; // Use the correct type for userReqBody
      const loginUser: newUser | null = await User.findOne({ email: userReqBody.email });
  
      if (!loginUser) {
        return res.send("User not found");
      }
      const passwordMatch = await bcrypt.compare(userReqBody.password, loginUser.password);
      console.log(loginUser.password, userReqBody.password);
    
      if (!passwordMatch) {
        return res.send("Incorrect password");
      }
  
      const token = jwt.sign(
        { email: loginUser?.email, name: loginUser.name },
        "secret", 
        { expiresIn: "1h" }
      );
      res.json({ message: "Login successful", token }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  };
export {createNewUser, getUser, login};