import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import captainRouter from "./Routes/captain.route.js"
import userRouter from "./Routes/user.routes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/user',userRouter)
app.use('/api/v1/captain',captainRouter)

export default app;
