import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

//create
export const createPost = async (req, res) => {
    try {
        const { userId, description } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath: req.file?.filename || '',
            likes: {},
        });
        await newPost.save();

        const post = (await Post.find()).reverse();
        res.status(201).json(post);
    } catch (err) {
        console.error(err)
        res.status(409).json({ message: err.message });
    }
};

// READ
export const getFeedPosts = async (req, res) => {
    try {
        const post = (await Post.find()).reverse();
        res.status(200).json(post);
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: err.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: err.message });
    }
};

// update
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        await post.save()
        
        res.status(200).json({message:'success'});
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: err.message });
    }
};

export const commentPost = async (req, res) => {
    try {
        const { id:postId } = req.params;
        const {userId,comment} = req.body;
        const newComment=new Comment({
            postId,
            user:userId,
            comment
        })
        await newComment.save();
        await Post.updateOne({_id:postId},{$inc:{commentsCount:1}})
        await newComment.populate('user','firstName lastName picturePath')
        res.status(200).json(newComment);
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: err.message });
    }
};

export const getComments = async (req, res) => {
    try {
        const { id:postId } = req.params;
        const comments= await Comment.find({postId}).populate('user','firstName lastName picturePath')
        res.status(200).json(comments)
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: err.message });
    }
}