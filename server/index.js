import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Authroutes from "./routes/AuthRoutes.js";

dotenv.config();

const PORT = process.env.BACKEND_PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", Authroutes);

const server = app.listen(PORT, () => {
  console.log(`Server successfully listen on port: ${PORT}`);
});
