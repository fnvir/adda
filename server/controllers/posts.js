import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

//create
export const createPost = async (req, res) => {
    try {
        const { userId, description } = req.body;
        const newPost = new Post({
            user:userId,
            description,
            picturePath: req.file?.filename || '',
        });
        await newPost.save();
        getFeedPosts(res,res)
    } catch (err) {
        console.error(err)
        res.status(409).json({ message: err.message });
    }
};

export const sharePost = async (req, res) => {
    try {
        const { userId, description, postId } = req.body;
        const newPost = new Post({
            user:userId,
            description,
            likes: {},
            share:{isShared:true,ogPost:postId}
        });
        await newPost.save();
        await Post.updateOne({_id:postId},{$inc:{shareCount:1}})
        getFeedPosts(req,res)
    } catch (err) {
        console.error(err)
        res.status(409).json({ message: err.message });
    }
};

export const editPost = async (req, res) => {
    try {
        const {description } = req.body;
        const {id:postId}=req.params;
        const update={description,picturePath:req.file?.filename||'',edited:true}
        await Post.findByIdAndUpdate(postId,update);
        getFeedPosts(req,res)
    } catch (err) {
        console.error(err)
        res.status(409).json({ message: err.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const {id:postId}=req.params;
        await Post.findByIdAndDelete(postId);
        await Post.deleteMany({'share.ogPost':postId})
        getFeedPosts(req,res)
    } catch (err) {
        console.error(err)
        res.status(409).json({ message: err.message });
    }
}


// READ
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find().populate([
            {path:'user',select:'firstName lastName picturePath'},
            {path:'share',populate: {path:'ogPost',select:'user description picturePath createdAt',populate:{path:'user',select:'firstName lastName picturePath'}}}
            ]).sort({createdAt:'desc'})
        res.status(200).json(post);
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: err.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndUpdate(userId,{$inc:{profileViews:1}})
        const post = await Post.find({ user:userId }).populate([
            {path:'user',select:'firstName lastName picturePath'},
            {path:'share',populate: {path:'ogPost',select:'user description picturePath createdAt',populate:{path:'user',select:'firstName lastName picturePath'}}}
            ]).sort({createdAt:'desc'})
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