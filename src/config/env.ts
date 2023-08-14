import dotenv from 'dotenv';
dotenv.config();
export const DB_URL = process.env.DB_URL ?? '';
export const port = 3000;
