import User from "../models/User.js";
import Comment from "../models/Comment.js";
import { searchPosts } from "./posts.js";

export const searchUsers = async(req,res)=>{
    try {
        const {query}=req.body;
        // const users = await User.find({
        //     $or: [
        //       {firstName:{$regex:new RegExp(query,'i')}},
        //       {lastName:{$regex:new RegExp(query,'i')}},
        //     ],
        //   }).sort({firstName:'asc'})
        const users= await User.find({$text:{$search:query}}).sort({score:{$meta:"textScore"}});
        res.status(200).json(users)
    } catch(err) {
        console.error(err)
        res.status(409).json({ msg: err.message });
    }
};

export const searchInPost = searchPosts;

export const searchInComments = async(req,res)=>{
    try {
        const {query} = req.body;
        const comments = await Comment.find({$text:{$search:query}})
                            .populate('user','firstName lastName picturePath')
                            .sort({score:{$meta:"textScore"}});
        res.status(200).json(comments)
    } catch(err) {
        console.error(err)
        res.status(409).json({ msg: err.message });
    }
}