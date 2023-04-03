import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
        postId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post',
            required: true
        },
        user: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true
        },
        comment: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
