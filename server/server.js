
import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./DB/connectDb.js";

dotenv.config();

const server=http.createServer(app)

connectDb()

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
