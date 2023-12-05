import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Skeleton, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import UserInfo from "../widgets/UserInfo";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


const Peoplelist = ({label='People' }) => {
    const { palette } = useTheme();
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state=>state.user);
    const friends=new Set((loggedInUser.friends??[]).map(f=>f._id));
    const location=useLocation();
    const query=new URLSearchParams(location.search).get('q')??'';
    const [people,setPeople]=useState();
    
    const getResults=()=>{
        fetch(`${process.env.REACT_APP_HOSTURL}/search/users`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" },
            body: JSON.stringify({query})
        }).then(async(res)=>{
            const data=await res.json()
            if(!res.ok) throw new Error(Object.values(data)[0])
            setPeople(data);
        }).catch(err => console.error(err))};

    useEffect(()=>{
        getResults();
    },[location.search]);

    const updateFriend = async (friendId) => {
        await fetch(`${process.env.REACT_APP_HOSTURL}/users/${loggedInUser._id}/friend/${friendId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            const data = await res.json();
            if (!res.ok) throw new Error(Object.values(data)[0])
            dispatch(setFriends({ friends: data }));
        }).catch(err => console.error(err));
    };

    return (
        <WidgetWrapper sx={{'maxHeight':`${4.3+3.5*8}rem`,'overflow':'auto'}}>
            <Typography
                color={palette.neutral.darker}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                {label.toUpperCase()}
            </Typography>
            {Array.isArray(people) ?
                (<Stack spacing={2} >
                    {people.map((p) => {
                        const isFrnd=friends.has(p._id)
                        return(
                        <FlexBetween key={p._id + 'flist'}>
                            <UserInfo
                                personId={p._id}
                                name={`${p.firstName} ${p.lastName}`}
                                subtitle={p.location || ''}
                                userPicturePath={p.picturePath}
                            />
                            {p._id!==loggedInUser._id?
                                (<Tooltip title={`${isFrnd?'Remove':'Add'} Friend`} disableInteractive>
                                    <IconButton
                                        onClick={() => updateFriend(p._id)}
                                        sx={{ backgroundColor: palette.primary.light, p: "0.6rem" }}
                                    >
                                        {isFrnd?<PersonRemoveOutlined sx={{color:'red'}}/>:<PersonAddOutlined sx={{ color: palette.primary.dark }}/>}
                                    </IconButton>
                                </Tooltip>)
                                : null
                            }
                        </FlexBetween>
                    )})}
                    {people.length<1?(<Box display="flex" justifyContent="center" alignItems="center">No results found</Box>):null}
                </Stack>)
                :
                (<Stack spacing={3}>
                    <Skeleton variant="rounded" width='100%' height='2.5rem' />
                    <Skeleton variant="rounded" width='100%' height='2.5rem' />
                    <Skeleton variant="rounded" width='100%' height='2.5rem' />
                </Stack>)
            }
        </WidgetWrapper>
    );
};

export default Peoplelist;