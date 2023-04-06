import mongoose from "mongoose";

const shareSchema=new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },
    shares: [{
        sharedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        sharedPost:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post',
            required:true
        }
    }],
})
