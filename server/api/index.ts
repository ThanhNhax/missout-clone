import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import UserRoute from '../src/routes/user.route'
import InfoRoute from '../src/routes/info.route'
import CategoryRoute from '../src/routes/category.route'
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json())

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Server datisekai is running....");
});


app.use('/user', UserRoute)
app.use('/info', InfoRoute)
app.use('/category', CategoryRoute)


const PORT = process.env.PORT || 6060;

app.listen(PORT, () => {
  console.log("Server running...." + PORT);
});