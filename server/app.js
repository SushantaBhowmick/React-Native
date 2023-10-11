import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

export const app = express();
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

//routes
import User from "./routes/User.js"

app.use("/api/v1",User)


