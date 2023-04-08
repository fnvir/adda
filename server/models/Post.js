import mongoose from "mongoose";

const postSchema = mongoose.Schema({
        user: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true
        },
        description: String,
        picturePath: String,
        likes: {
            type: Map,
            of: Boolean,
            default:{}
        },
        commentsCount: {
            type: Number,
            default: 0,
        },
        shareCount:{
            type:Number,
            default:0
        },
        edited:{
            type:Boolean,
            default:false
        },
        views: {
            type: Number,
            default: 0,
        },
        share: {
            ogPost:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Post',
                default:null
            },
            isShared: {
                type: Boolean,
                default: false,
            },
        },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
