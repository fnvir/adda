import {Box, CircularProgress, Divider, Grid, Link, Paper, Stack, Typography, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {timeDiff} from "utils";



const SearchComments = () => {
    const { palette } = useTheme();
    const [loading,setLoading]=useState(true);
    const [comments,setComments]=useState([]);
    const token = useSelector((state) => state.token);
    const location=useLocation();
    const query=new URLSearchParams(location.search).get('q')??'';

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_HOSTURL}/search/comments`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" },
            body: JSON.stringify({query})
        }).then(async(res)=>{
            const data=await res.json()
            if(!res.ok) throw new Error(Object.values(data)[0])
            setComments(data);
            setLoading(false);
        }).catch(err => console.error(err));
    },[location.search])

        // }).then(res=>res.json())
        // .then(setComments)
        // .then(()=>setLoading(false))
        // .catch(err => console.errror(err))

    let ret=[];
    for(let i=0;i<comments.length;i++) {
        let c=comments[i];
        ret.push((
            <Box key={`${c._id}`} style={{ padding: "1em"}}>
                <Typography align='right' mt='-1rem' sx={{display:'block'}} variant='caption' fontWeight='bold' color={palette.neutral.medium} >
                    {timeDiff(Date.now()-new Date(c.createdAt))+' ago'}
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
        <>
            <Typography
                color={palette.neutral.darker}
                variant="h4"
                fontWeight="500"
                textAlign={'center'}
            >
                Matched Comments
            </Typography>
            <Stack component={Paper} px={2} py={2} mt='2em'>
                <Box mt="0.5rem">
                    {!loading ?
                        (<Box sx={{'maxHeight':`35rem`,'overflow':'auto'}}>
                            {ret}
                        </Box>)
                        :
                        (<Box display="flex" justifyContent="center" alignItems="center">
                            <CircularProgress disableShrink />
                        </Box>)
                    }
                    {ret.length<1 && <Box m="3rem 0"><Typography textAlign={'center'}>Nothing found</Typography></Box>}
                </Box>
            </Stack>
        </>
    )
}
export default SearchComments;