import express from "express";
import { ConfigurationDB } from "./data-source";
import userRoutes from "./routes/userauth.routes";
import categoryRouter from "./routes/category.routes";
import menuItemsRouter from "./routes/menuItems.routes";
// import { reCreatearefreshToken } from "./utils/jwt.auth";

const app = express();
ConfigurationDB()  // Database Connecting function


app.use(express.json())
// reCreatearefreshToken()
app.use("/",userRoutes)
app.use("/",categoryRouter)
app.use("/",menuItemsRouter)

app.listen(7000,() => console.log('Server started on http://localhost:7000'))