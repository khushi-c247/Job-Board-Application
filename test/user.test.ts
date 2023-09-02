import { expect } from "chai";
// import request  from 'express';
import jwt from "jsonwebtoken";
import app from "../index";
import { testConnection } from "../src/config/db";
import request from "supertest";
import UserModel from "../src/Model/UserModel";
import JobModel from "../src/Model/JobModel";
import { versions } from "../src/helper/constants";
import dotenv from "dotenv";
dotenv.config();
const loginDetails: {email : string , password: string , role : string} = { email: "cipla@123.com", password: "cipla" , role : "normal" };
;
// let role  : string = "admin";
testConnection();
UserModel.deleteMany({})
JobModel.deleteMany({})
let token : string = "" 
before(async () => {
  UserModel.deleteMany({})
  UserModel.create({
    name: "cipla",
    email: "cipla@123.com",
    password: "cipla",
    experience: 5,
    discription: "software developer",
    graduationYear: 2012,
    role: "admin",
  })
   token = jwt.sign(
    { email: loginDetails.email, role: loginDetails.role },
    "secret",
    { expiresIn: "1h" }
  );
  });
  
describe("user", () => {
  it("should not post job  appliction if details are empty", (done: any) => {
    request
      .agent(app)
      .post(`/${versions}/user/job-application`)
      .set('Authorization', `Bearer ${"55455544"}`)
      .send({ jobId : "64d9fd9f58ab9fcdd3cc58c2" })
      .expect(401)
      .then(done())
      .catch((err: Error) => {
        done(err);
      });
  });

  it("should post job if role is admin", (done: any) => {
    request
      .agent(app)
      .post(`/${versions}/admin/add-job`)
      .set('Authorization', `Bearer ${token}`)
      .send({ jobId : "64f1a39f5843b27519f47f45" })
      .expect(200)
      // .then(done())
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

