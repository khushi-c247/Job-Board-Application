import mongoose from "mongoose";
//Interface for Job
interface jobObj {
  title: string;
  discription: string;
  requirements: string;
  salary: number;
}

//interface for user object
interface newUser {
  name: string;
  email?: string;
  password: string;
  experience: number;
  discription: string;
  graduationYear: number;
  appliedTo: [mongoose.Types.ObjectId];
  role: string;
  hashPassword: () => void;
  checkPassword: (password: string) => {};
  token: string;
}

interface Loginbody {
  email: string;
  password: string;
}
// type demoFunction = (result: [], options:object) => void;
interface demoFunction {
  paginate(): void;
}
//Job interface
interface job extends demoFunction {
  title: string;
  discription: string;
  requirements: string;
  salary: number;
  applicantsId: [mongoose.Types.ObjectId];
}

interface application {
  userId: string;
  jobId: string;
}

//Sorting
interface sorting {
  colm: string;
  order: number;
}

interface search {
  search: string;
  page: number;
  limit: number;
  userId: string;
}
interface orInterface {
  $or: { [x: string]: { $regex: string; $options: string } }[];
}

interface reqUser {
  _id?: mongoose.Types.ObjectId;
  name?: string;
  email?: string;
  password?: string;
  experience?: number;
  discription?: string;
  graduationYear?: number;
  appliedTo?: mongoose.Types.ObjectId;
  role?: string;
  __v?: number;
}
export {
  jobObj,
  newUser,
  Loginbody,
  job,
  application,
  sorting,
  search,
  orInterface,
  reqUser,
};
