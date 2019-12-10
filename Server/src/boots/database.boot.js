import mongoose from 'mongoose';

import {
  SanGiaoDichDaQuy_DB_URL
} from '../config/database.config';



export async function MongoDBConnect() {
    let link = SanGiaoDichDaQuy_DB_URL;
    if (process.env.NODE_ENV === 'production' && process.env.SanGiaoDichDaQuy_DB_URL) {
        link = process.env.SanGiaoDichDaQuy_DB_URL;
    }
    await mongoose.connect(
        link, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
    );
    console.log('Connect to MongoDB success');
}
