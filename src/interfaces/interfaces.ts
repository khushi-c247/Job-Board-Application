//Interface for Job
interface jobObj {
    title: string,
    discription: string,
    requirements: String,
    salary: number
}

//interface for user object 
interface newUser {
    name: string
    email:  String,
    password : string,
    experience: number
    discription: string ,
    graduationYear:number,
    appliedTo: [String]
  
}
interface body {
    email : string , 
    password : string,
}

export { jobObj, newUser , body}