//Interface for Job
interface jobObj {
    title: string,
    discription: string,
    requirements: string,
    salary: number
}

//interface for user object 
interface newUser {
    name: string
    email:  string,
    password : string,
    experience: number
    discription: string ,
    graduationYear:number,
    appliedTo: [string],
    role: string
  
}

interface Loginbody {
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
export { jobObj, newUser , Loginbody, job}