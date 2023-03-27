import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import {register} from './controllers/auth.js'
import {createPost} from './controllers/posts.js'
import { verifyToken,checkStrength } from "./middleware/auth.js"
import User from './models/User.js'
import Post from "./models/Post.js"
import {users,posts} from './data/index.js'

// CONFIGS

const __filename=fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app=express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan('common'))
app.use(bodyParser.json({limit:"15mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"15mb",extended:true}))
app.use(cors())
app.use("/assets",express.static(path.join(__dirname,'public/assets')))


// file storage
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/assets');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});
const upload=multer({
    storage,
    fileFilter:(req,file,cb)=>{
        if(req.body.password && !checkStrength(req.body.password).strong) cb(null,false);
        else cb(null,true)
    }
})

// routes with files
app.post('/auth/register',upload.single('picture'),register)
app.post('/posts',verifyToken, upload.single('picture'),createPost)

// routes
app.use('/auth',authRoutes)
app.use('/users',userRoutes)
app.use('/posts',postRoutes)

//Mongoose setup
const PORT=process.env.PORT||6009;

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(async()=>{

    // insert temp data only 1st time
    if(await Post.count()==0) await Post.insertMany(posts)
    if(await User.count()==0) await User.insertMany(users);

    app.listen(PORT,()=>console.log('\n\x1b[36m%s\x1b[0m\n\x1b[35mPORT: %s\x1b[0m', 'SERVER STARTED!',PORT))

}).catch((error)=>console.error('\x1b[31m%s\x1b[0m',error))

