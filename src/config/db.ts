import mongoose, { connect } from "mongoose";
import { DB_URL,DB_TESTING} from "./env";
import dotenv from "dotenv";
dotenv.config();
let url :string ;
if(process.env.NODE_ENV==='dev') {
    url = DB_URL
}
else 
{
   url =DB_TESTING
}
export  function dbConnection() {
  mongoose
    .connect(url)
    .then(() => console.log("DB connected at", { DB_URL }))
    .catch(() => console.log("errorin DB"));
}

// //ERROR IN ENV!!
export function testConnection(){
  mongoose
  .connect(url)
  .then(() => console.log("DB connected at"))
  .catch((err) => console.log("error in DB", err));
  }

