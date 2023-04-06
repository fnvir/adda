import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPosts, setPosts } from "state";
import PostWidget from "./PostWidget";

const Posts = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const host = process.env.REACT_APP_HOSTURL

    const getAllPosts = () => {
        fetch(`${host}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        }).then(async(res)=>{
            const data = await res.json();
            if(!res.ok)
                throw new Error(Object.values(data)[0])
            dispatch(setPosts({ posts: data }));
        }).catch((err)=>{
            console.error(err)
            dispatch(clearPosts())
        });
    };

    const getUserPosts = async () => {
        await fetch(
            `${host}/users/${userId}/posts`,{
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }).then(async(res)=>{
                const data = await res.json();
                if(!res.ok) throw new Error(Object.values(data)[0])
                dispatch(setPosts({ posts: data }));
            }).catch(err=>{
                dispatch(setPosts({posts:[]}))
                console.error(err)
            })
    };

    useEffect(() => {
        if (isProfile)
            getUserPosts();
         else 
            getAllPosts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {posts.map(p =><PostWidget key={p._id} post={p} isProfile={isProfile}/>)}
        </>
    );
};

export default Posts;