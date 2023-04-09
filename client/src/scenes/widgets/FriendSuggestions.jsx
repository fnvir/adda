import { PersonAddOutlined } from "@mui/icons-material";
import { Box, IconButton, Skeleton, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import UserInfo from "./UserInfo";

const FriendSuggestions = ({ userId }) => {
    const { palette } = useTheme();
    const token = useSelector(state => state.token);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const [people,setPeople] = useState([])
    const friends=useSelector(state=>state.user.friends) || [] // if added as friend, dont show

    const updateFriend = async (friendId) => {
        await fetch(`${process.env.REACT_APP_HOSTURL}/users/${userId}/friend/${friendId}`, {
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

    if (!loaded) {
        fetch(`${process.env.REACT_APP_HOSTURL}/users/${userId}/nearby`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(async(res)=>{
            const data=await res.json()
            if(!res.ok) throw new Error(Object.values(data)[0])
            setPeople(data)
        })
        .then(() => setLoaded(true))
        .catch(err => console.error(err))
    }
    return (
        <WidgetWrapper sx={{'maxHeight':`${4.3+3.5*8}rem`,'overflow':'auto'}}>
            <Typography
                color={palette.neutral.darker}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                {'You May Know'.toUpperCase()}
            </Typography>
            {loaded ?
                (<Stack spacing={2}>
                    {people.map((f) => 
                        friends.some(fr=>fr._id==f._id)? // if friends
                        null:
                        (<FlexBetween key={f._id + 'people'}>
                            <UserInfo
                                personId={f._id}
                                name={`${f.firstName} ${f.lastName}`}
                                subtitle={f.location || ''}
                                userPicturePath={f.picturePath}
                            />
                            <Tooltip title={'Add Friend'} disableInteractive>
                                <IconButton
                                    onClick={() => updateFriend(f._id)}
                                    sx={{ backgroundColor: palette.primary.light, p: "0.6rem" }}
                                >
                                    <PersonAddOutlined sx={{ color: palette.primary.dark }} />
                                </IconButton>
                            </Tooltip>
                        </FlexBetween>
                    ))}
                    {people.length<1?(<Box display="flex" justifyContent="center" alignItems="center">None</Box>):null}
                </Stack>)
                :
                (<Stack spacing={2}>
                    <Skeleton variant="rounded" width='100%' height='2.5rem' animation='wave' />
                    <Skeleton variant="rounded" width='100%' height='2.5rem' />
                </Stack>)
            }
        </WidgetWrapper>
    );
};

export default FriendSuggestions;