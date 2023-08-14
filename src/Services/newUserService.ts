import user from '../Model/UserModel'
import {newUser} from  '../interfaces/reqRes'

//Create New User
const createNewUser = (obj:newUser) =>{
    user.create({name:obj.name, email: obj.email ,experience:obj .experience})
}
export default createNewUser;