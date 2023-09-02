import dotenv from "dotenv";
dotenv.config();
export const DB_URL = process.env.DB_URL ?? "";
export const DB_TESTING = process.env.DB_TESTING ?? "";
export const key = process.env.KEY;
export const port = process.env.PORT;
export const Env = process.env.ENV
