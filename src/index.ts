import express from "express";
import { ConfigurationDB } from "./data-source";
import userRoutes from "./routes/userauth.routes";
// import { reCreatearefreshToken } from "./utils/jwt.auth";

const app = express();
ConfigurationDB()  // Database Connecting function


app.use(express.json())
// reCreatearefreshToken()
app.use("/",userRoutes)

app.listen(7000,() => console.log('Server started on http://localhost:7000'))