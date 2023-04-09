import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { checkStrength } from '../middleware/auth.js'

// Register user
export const register= async(req,res)=>{
    try{
        let {
            firstName,
            lastName,
            email,
            password,
            location,
            occupation
        } = req.body;
        email=email.toLowerCase();
        if(await User.findOne({email}))
            return res.status(400).json({msg:'Email already in use !',err:'email'})
        let z=checkStrength(password);
        if(!z.strong) return res.status(400).json({msg:z.msg,err:'password'})
        const salt=await bcrypt.genSalt();
        const passwordHash= await bcrypt.hash(password,salt);
        const newUser=new User({
            firstName:firstName.charAt(0).toUpperCase()+firstName.substring(1),
            lastName:lastName.charAt(0).toUpperCase()+lastName.substring(1),
            email,
            password:passwordHash,
            picturePath:req.file?.filename || 'default.png',
            friends:[],
            location,
            occupation,
        });
        const savedUser=await newUser.save();
        res.status(201).json(savedUser)
    } catch(err){
        console.error(err)
        return res.status(500).json({error:err.message})
    }
}

// Log in
export const login =async(req,res)=>{
    try{
        // throw new Error('500 test')
        let {email,password}=req.body;
        email=email.toLowerCase()
        const user=await User.findOne({email:email}).select('+password')
        if(!user)
            return res.status(400).json({msg:'User not found !',err:'email'})
        let z=checkStrength(user.password+'');
        if(!z.strong)
            return res.status(400).json({msg:z.msg,err:'password'})
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch)
            return res.status(400).json({msg:'Invalid Password !',err:'password'})  
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        delete user._doc.password
        res.status(200).json({token,user})
    } catch(err){
        console.error(err)
        res.status(500).json({error:err.message})
    }
}
