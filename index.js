import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import ConnectDB from "./config/database.js"
import userRoute from "./routes/user_routes.js"
import courseRoute from "./routes/course_route.js"
import batchRoute from "./routes/batch_route.js"



const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

dotenv.config();

ConnectDB();

app.use("/user", userRoute);
app.use("/course", courseRoute);
app.use("/batch", batchRoute);


app.get("/", (req, res)=>{
    res.send(`<h1> server is running for API</h1>`);
})

const PORT = process.env.Port

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`)
})