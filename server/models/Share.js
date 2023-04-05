import mongoose from "mongoose";

export const shareSchema=new mongoose.Schema({
    ogPost:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        default:null
    },
    isShared: {
        type: Boolean,
        default: false,
    },
})
