import { expect } from "chai";
// import request  from 'express';
import app from "../index";
import { testConnection } from "../src/config/db";
import request from "supertest";
import UserModel from "../src/Model/UserModel";
import JobModel from "../src/Model/JobModel";
import { versions } from "../src/helper/constants";
import dotenv from "dotenv";
dotenv.config();
testConnection();
UserModel.deleteMany({})
JobModel.deleteMany({})
before(async () => {

  UserModel.deleteMany({})
  UserModel.create({
    name: "ciplaaaaaaa",
    email: "ciplaaaaaa@123.com",
    password: "cipla",
    experience: 5,
    discription: "software developer",
    graduationYear: 2012,
    role: "normal",
  }, {
    name: "cip",
    email: "cip@123.com",
    password: "cip",
    experience: 5,
    discription: "software developer",
    graduationYear: 2012,
    role: "admin",
  });
});

const loginDetails: object = { email: "ciplaaaaaa@123.com", password: "cipla" };
let token: string = "";
let userId ;
describe("Authentication", () => {
  it("should not get login if username password is incorrect", (done: any) => {
    request
      .agent(app)
      .post(`/${versions}/login`)
      .send({ email: "kkshjhs", password: "jjas" })
      .expect(401)
      .then(done())
      .catch((err: Error) => {
        done(err);
      });
  });

  it("if id password is correct it should return a valid token", (done: any) => {
    request
      .agent(app)
      .post(`/${versions}/login`)
      .send(loginDetails)
      .expect(200)
      // .then(done())
      .then((res) => {
        expect(res.body).to.have.property("token");
        token = res.body.token;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("createUser",()=>{
  it("should not create user if any one of inputs are empty", (done:any)=>{
    request
      .agent(app)
      .post(`/${versions}/new-user`)
      .send({ 
        name : "",
        experience : 0,
        email: "",
        discription: "",
        graduationYear: 0,
        role : ""
       })
      .expect(400)
      .then(done())
      .catch((err: Error) => {
        done(err);
      });
  });
  it("should create user", (done:any)=>{
    request
      .agent(app)
      .post(`/${versions}/new-user`)
      //always give unique ids
      .send({ 
        name : "pushpa",  
        email : "pushpa@123.com",
        password :"pushpa",
        experience : 5,
        discription: "software developer",
        graduationYear: 2012,
        role : "normal"
       })
      .expect(200)
      .then((res)=>{
        // expect(res.body).to.have.property('_id')
        // userId = res.body._id
        done()
      })
      .catch((err: Error) => {
        console.log(err);
        done()
        
      });
    });
  
})
