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
const loginDetails: {email : string , password: string , role : string} = { email: "ciplaaa@123.com", password: "cipla" , role : "admin" };
;
// let role  : string = "admin";

let token : string ; 
before(async () => {
testConnection();
UserModel.deleteMany({})

  UserModel.create({
    name: "ciplaaaaaaa",
    email: "ciplaaa@123.com",
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
  
describe("admin", () => {
  it("should not post job if role is not admin", (done: any) => {
    request
      .agent(app)
      .post(`/${versions}/admin/add-job`)
      .set('Authorization', `Bearer ${"55455544"}`)
      .send({
        title : "Home designers", 
        discription :"our company is hiring Home designers who has experiance in relavent feild",
        requirements :"Need a Experianced home designers ",
        salary : 700000
    })
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
      .send({
        title : "Home designers", 
        discription :"our company is hiring Home designers who has experiance in relavent feild",
        requirements :"Need a Experianced home designers ",
        salary : 700000
    })
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


describe("admin", () => {
    it("cannt see all applicaints if not admin", (done: any) => {
      request
        .agent(app)
        .post(`/${versions}/admin/add-job`)
        .set('Authorization', `Bearer ${"55455544"}`)
        .send({
          title : "Home designers", 
          discription :"our company is hiring Home designers who has experiance in relavent feild",
          requirements :"Need a Experianced home designers ",
          salary : 700000
      })
        .expect(401)
        .then(done())
        .catch((err: Error) => {
          done(err);
        });
    });
  
    it("should see all applicaints", (done: any) => {
      request
        .agent(app)
        .post(`/${versions}/admin/add-job`)
        .set('Authorization', `Bearer ${token}`)
        .send()
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
  

