import applicationModel from '../Model/AppliModel'
interface appliObj {
   name : string,
   email : string

}
 const createAplication =   async (obj : appliObj)=>{
   await applicationModel.create({name : obj.name , email : obj.email})
 }

 export  default createAplication