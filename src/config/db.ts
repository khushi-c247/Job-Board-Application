import mongoose from 'mongoose';
import { DB_URL } from './env';


export default () => {
 mongoose
 .connect(DB_URL)
 .then(() => console.log('DB connected at', { DB_URL }))
 .catch(() => console.log('errorin DB'));
};