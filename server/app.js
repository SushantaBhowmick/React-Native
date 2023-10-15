import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

export const app = express();
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    limits:{fileSize:50*1024*1024},
    useTempFiles:true,
})
);

app.get('/',(req,res)=>{
    res.send("<h1>I am Working</h1>")
})
//routes
import User from "./routes/User.js"
import fileUpload from 'express-fileupload';

app.use("/api/v1",User)


