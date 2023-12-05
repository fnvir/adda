import { Box, Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPosts } from "state";
import { useLocation } from "react-router-dom";
import PostWidget from "scenes/widgets/PostWidget";

const SearchPosts = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const location=useLocation();
    const query=new URLSearchParams(location.search).get('q')??'';
    const [posts,setPosts] = useState()

    const searchPosts = () => {
        fetch(`${process.env.REACT_APP_HOSTURL}/search/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" },
            body: JSON.stringify({query})
        }).then(async(res)=>{
            const data = await res.json();
            if(!res.ok)
                throw new Error(Object.values(data)[0])
            setPosts(data)
        }).catch((err)=>{
            console.error(err)
            dispatch(clearPosts())
        });
    };

    useEffect(() => {
        searchPosts()
    }, [location.search]); 

    if(!Array.isArray(posts)) {
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
            {posts.map(p =><PostWidget key={p._id} post={p} />)}
            {!posts.length?(<Box mt={9} display="flex" justifyContent="center" alignItems="center">No results found</Box>):null}
        </>
    );
};

export default SearchPosts;