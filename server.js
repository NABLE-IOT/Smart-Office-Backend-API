import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

//routes
import authRouter from "./routes/authRoutes.js";
import deviceRouter from "./routes/deviceRoutes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/device", deviceRouter);

//define port
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server Is Listening Port ${port}....`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
