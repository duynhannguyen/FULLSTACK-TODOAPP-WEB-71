import express from "express";
import appRouter from "./routes/index.js";
import cors from "cors";
import { connectToDatabase } from "./config/database.js";

const app = express();
const PORT = 3001;

connectToDatabase();

app.use(express.json());
app.use(cors("*"));
app.use("/api/v1", appRouter);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});