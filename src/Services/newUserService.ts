import user from '../Model/UserModel'
import { newUser } from '../interfaces/interfaces'

// Create a new User to DataBase
const createNewUser = (obj: newUser) => {
    user.create({ name: obj.name, email: obj.email, experience: obj.experience,
        discription: obj.discription, graduationYear: obj.graduationYear })
}
export default createNewUser;