import { Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPosts, setPosts } from "state";
import PostWidget from "./PostWidget";

const Posts = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const [loading,isLoading] = useState(true)
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
            isLoading(false)
        }).catch((err)=>{
            console.error(err)
            dispatch(clearPosts())
        });
    };

    const getUserPosts = () => {
        fetch(`${host}/users/${userId}/posts`,{
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
        }).then(async(res)=>{
            const data = await res.json();
            if(!res.ok) throw new Error(Object.values(data)[0])
            dispatch(setPosts({ posts: data }));
            isLoading(false)
        }).catch(err=>{
            dispatch(setPosts({posts:[]}))
            console.error(err)
        })
    };

    useEffect(() => {
        !isProfile?getAllPosts():getUserPosts()
    }, []); 

    if(loading) {
        const a=[]
        for(let i=0;i<3;i++)
            a.push(
                <Stack key={'stck'+i}>
                    <Stack direction="row" alignItems="center" gap={2} >
                        <Skeleton variant="circular" width={50} height={50} animation='wave'/>
                        <Skeleton width='92%' height='4rem' animation='wave'/>
                    </Stack>
                    <Skeleton variant="rounded" width='100%' height='15rem' animation='wave'/>
                </Stack>
            )
        return <Stack mt='1.5rem' spacing={4}>{a}</Stack>
    }
    return (
        <>
            {posts.map(p =><PostWidget key={p._id} post={p} isProfile={isProfile}/>)}
        </>
    );
};

export default Posts;