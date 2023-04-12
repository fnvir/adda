import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Skeleton, Tooltip, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import UserInfo from "./UserInfo";

const FriendList = ({ userId, othersFriendList=false, length=0 }) => {
    const { palette } = useTheme();
    const {user:loggedInUser, token} = useSelector(state=>state);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const friends = useSelector(state => state.user.friends) || []
    const [friends2,setFriends2] = useState([])
    
    const updateFriend = (friendId) => {
        fetch(`${process.env.REACT_APP_HOSTURL}/users/${loggedInUser._id}/friend/${friendId}`, {
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

    const skeletons=[];
    if(!loaded)
        for(let i=0;i<Math.min(length,10);i++)
            skeletons.push(<Skeleton key={'skltn-'+i} variant="rounded" width='100%' height='2.5rem' animation='wave'/>)

    if (!loaded) {
        fetch(`${process.env.REACT_APP_HOSTURL}/users/${userId}/friends`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(async(res)=>{
            const data=await res.json()
            if(!res.ok) throw new Error(Object.values(data)[0])
            othersFriendList?setFriends2(data):dispatch(setFriends({friends:data}))
        })
        .then(() => setLoaded(true))
        .catch(err => console.error(err))
    }

    return (
        <WidgetWrapper sx={{'maxHeight':`${4.3+3.5*10}rem`,'overflow':'auto'}}>
            <Typography
                color={palette.neutral.darker}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                {`${!othersFriendList?'My':''} Friends`.toUpperCase()}
            </Typography>
            {loaded ?
                (<Stack spacing={2}>
                    {(othersFriendList?friends2:friends).map((friend) => {
                        const isFrnd=friends.some(f=>f._id==friend._id)
                        return(
                        <FlexBetween key={friend._id + 'flist'}>
                            <UserInfo
                                personId={friend._id}
                                name={`${friend.firstName} ${friend.lastName}`}
                                subtitle={friend.location || ''}
                                userPicturePath={friend.picturePath}
                            />
                            {friend._id!==loggedInUser._id?
                                (<Tooltip title={`${isFrnd?'Remove':'Add'} Friend`} disableInteractive>
                                    <IconButton
                                        onClick={() => updateFriend(friend._id)}
                                        sx={{ backgroundColor: palette.primary.light, p: "0.6rem" }}
                                    >
                                        {isFrnd?<PersonRemoveOutlined sx={{color:'red'}}/>:<PersonAddOutlined sx={{ color: palette.primary.dark }}/>}
                                    </IconButton>
                                </Tooltip>)
                                : null
                            }
                        </FlexBetween>
                    )})}
                    {(othersFriendList?friends2:friends).length<1?(<Box display="flex" justifyContent="center" alignItems="center">None</Box>):null}
                </Stack>)
                :
                (<Stack spacing={2}>
                    {skeletons}
                </Stack>)
            }
        </WidgetWrapper>
    );
};

export default FriendList;