//Interface for Job
interface jobObj {
    title: string,
    discription: string,
    requirements: String,
    salary: number
}
//interface for Role (ADMIN/USER)

//interface for user object 
interface newUser {
    name: string
    email:  String,
    password : string,
    experience: number
    discription: string ,
    graduationYear:number,
    appliedTo: [String],
    role: String
  
}
interface body {
    email : string , 
    password : string,
}
//Job interface

interface job
 {
    title : string,
    discription: string,
    requirements: string,
    salary: number,
    applicantsId: [string]
 }
export { jobObj, newUser , body , job}