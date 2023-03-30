import multer from "multer"
import { checkStrength } from "./auth.js";

// file storage
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/assets');
    },
    filename:(req,file,cb)=>{
        let z=Math.random().toString(36).substring(2)+Date.now()+Math.random().toString(36).substring(2),x;
        if((x=file.originalname.lastIndexOf('.'))>0)
            z+=file.originalname.substring(x)
        cb(null,z)
    }
});

export const upload=multer({
    storage,
    fileFilter:(req,file,cb)=>{
        if(req.body.password && !checkStrength(req.body.password).strong) cb(null,false);
        else cb(null,true)
    }
})