import { SendOutlined } from "@mui/icons-material";
import { Avatar, Box, Divider, Grid, IconButton, InputBase, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateComments } from "state";



const CommentSection = ({ userId, postId, comments }) => {
    const { palette } = useTheme();
    const [comment,setComment] = useState('');
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    const handleClick=async()=>{
        
        await fetch(`${process.env.REACT_APP_HOSTURL}/posts/${postId}/comment`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId,comment,date:Date.now() }),
        }).then(async(res)=>{
            const newComment = await res.json();
            if(!res.ok)
                throw new Error(Object.values(newComment)[0])
            console.log(typeof newComment)
            console.log(newComment)
            dispatch(updateComments({ postId, newComment}));
            setComment('')
            console.log(comments)
        }).catch(err=>{
            console.error(err)
        });
    }
    let ret=[];
    for(let i=comments.length-1;i>-1;i--) {
        ret.push((
            <Box key={`${postId}-${i}`} style={{ padding: "1em"}}>
                <Grid container wrap='nowrap' spacing={2}>
                    <Grid item>
                        <Avatar alt='name' src={'default.png'} />
                    </Grid>
                    <Grid item xs zeroMinWidth sx={{ padding: '0 auto' }}>
                        <Typography align='left' color={palette.neutral.mediumMain} variant='h6'>
                            {'John Cena'}
                            {/* {comments[i].userId} */}
                        </Typography>
                        <Typography align='justify' variant='subtitle'>
                            {comments[i].comment}
                        </Typography>
                    </Grid>
                        <Typography align='right' variant='caption' color={palette.neutral.medium} >{new Date(comments[i].date).toUTCString()}</Typography>
                    
                </Grid>
                <Divider sx={{ marginTop: '1rem' }}/>
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
                value={comment}
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
                onChange={(e) => setComment(e.target.value)}
            />
            <Divider sx={{ marginTop: '1rem' }} />
            {ret}

        </Box>
    )
}
export default CommentSection;