import { EditOutlined, PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";

const PostInfo = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const { palette } = useTheme();
    const isFriend = useSelector((state) => state.user.friends).includes(friendId);

    const updateFriend = async () => {
        await fetch(
            `${process.env.REACT_APP_HOSTURL}/users/${_id}/${friendId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        ).then(async (res) => {
            const data = await res.json();
            if (!res.ok) throw new Error(Object.values(data)[0])
            dispatch(setFriends({ friends: data }));
        }).catch(err => {
            console.error(err)
        });
    };

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="40px" alt={name} />
                <Box>
                    <Typography
                        color={palette.neutral.dark}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.neutral.light,
                                cursor: "pointer",
                            },
                        }}
                        onClick={() => {
                            navigate(`/profile/${friendId}`);
                            navigate(0);
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={palette.neutral.medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            {_id !== friendId ? (
                <Tooltip title={(isFriend ? 'Remove' : 'Add') + ' Friend'}>
                    <IconButton
                        onClick={updateFriend}
                        sx={{ backgroundColor: palette.primary.light, p: "0.6rem" }}
                    >
                        {isFriend ?
                            <PersonRemoveOutlined sx={{ color: 'red' }} />
                            :
                            <PersonAddOutlined sx={{ color: palette.primary.dark }} />
                        }
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title='Edit post'>
                    <IconButton>
                        <EditOutlined sx={{color:palette.primary.dark}}/>
                    </IconButton>
                </Tooltip>
            )}
        </FlexBetween>
    );
};

export default PostInfo;