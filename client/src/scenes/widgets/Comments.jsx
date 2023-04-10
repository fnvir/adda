import { SendOutlined } from "@mui/icons-material";
import {Box, CircularProgress, Divider, Grid, IconButton, InputBase, Link, Typography, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateComments } from "state";
import timeDiff from "utils";



const CommentSection = ({ userId, postId}) => {
    const { palette } = useTheme();
    const [loading,setLoading]=useState(true);
    const [comments,setComments]=useState([]);
    const [newcomment,setNewComment] = useState('');
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    if(loading)
        fetch(`${process.env.REACT_APP_HOSTURL}/posts/${postId}/comments`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        }).then(res=>res.json())
        .then(setComments)
        .then(()=>setLoading(false))
        .catch(err => console.errror(err))

    const handleClick=async()=>{
        await fetch(`${process.env.REACT_APP_HOSTURL}/posts/${postId}/comment`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId,comment: newcomment}),
        }).then(async(res)=>{
            const data = await res.json();
            if(!res.ok)
                throw new Error(Object.values(data)[0])
            setNewComment('')
            dispatch(updateComments({ postId, newComment:data}));
            comments.push(data)
        }).catch(err=>{
            console.error(err)
        });
    }

    let ret=[];
    for(let i=0;i<comments.length;i++) {
        let c=comments[i];
        ret.push((
            <Box key={`${c._id}`} style={{ padding: "1em"}}>
                <Typography align='right' mt='-1rem' sx={{display:'block'}} variant='caption' fontWeight='bold' color={palette.neutral.medium} >
                    {new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: "numeric", hour: 'numeric', minute: 'numeric', hour12: true}).format(new Date(c.createdAt))}
                </Typography>
                <Grid container wrap='nowrap' spacing={2} marginTop='-1rem'>
                    <Grid item>
                        <UserImage size='40px' alt={c.user.firstName} image={c.user?.picturePath||'none'} />
                    </Grid>
                    <Grid item xs zeroMinWidth sx={{ padding: '0 auto' }}>
                        <Typography>
                            <Link 
                                underline='none' 
                                href={`/profile/${c.user._id}`} 
                                align='left' 
                                color={palette.neutral.mediumMain} 
                                variant='h6'
                                sx={{"&:hover":{color: palette.primary.main,cursor: "pointer"}}}
                            >
                                {`${c.user.firstName} ${c.user.lastName}`}
                            </Link>
                        </Typography>
                        <Typography align='justify' variant='subtitle'>
                            {c.comment}
                        </Typography>
                    </Grid>
                    

                </Grid>
                <Divider sx={{ marginTop: '.5rem'}}/>
            </Box>
        ))
    }
    return (
        <Box mt="0.5rem">
            <InputBase
                placeholder="Comment on this post..."
                multiline={true}
                minRows={1}
                maxRows={5}
                value={newcomment}
                sx={{
                    width: "100%",
                    backgroundColor: palette.primary.light,
                    borderRadius: "2rem",
                    padding: ".3rem 1rem",
                    marginTop: ".8rem"
                }}
                endAdornment={
                    <IconButton onClick={handleClick}>
                        <SendOutlined />
                    </IconButton>
                }
                onChange={(e) => setNewComment(e.target.value)}
            />
            <Divider sx={{ marginTop: '1rem',marginBottom:'.5rem'  }} />
            {!loading ?
                (<Box sx={{'maxHeight':`35rem`,'overflow':'auto'}}>
                    {ret}
                </Box>)
                :
                (<Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress disableShrink />
                </Box>)
            }
        </Box>
    )
}
export default CommentSection;