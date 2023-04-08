import {
    CachedOutlined,
    ChatBubbleOutlineOutlined,
    EditOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Link, SvgIcon, Tooltip, Typography, useTheme } from "@mui/material";
import CommentSection from "scenes/widgets/Comments";
import FlexBetween from "components/FlexBetween";
import UserInfo from "scenes/widgets/UserInfo";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLikes, setPosts } from "state";

const PostWidget = ({ post,isProfile=false }) => {
    const isShared = post.share?.isShared || false;
    const {
        user: {
            _id: postUserId,
            firstName,
            lastName,
            picturePath: userPicturePath
        },
        description,
        createdAt,
        picturePath,
    } = isShared ? post.share.ogPost : post;
    const { _id: postId, likes, commentsCount, shareCount, views } = post;
    const [isComments, setIsComments] = useState(false);
    const [showFullText, setFullText] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const { _id: userId, firstName: vfname, lastName: vlname } = useSelector(state => state.user)
    const { firstName: sfname, lastName: slname } = post.user;
    const isLiked = Boolean(likes[userId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        await fetch(`${process.env.REACT_APP_HOSTURL}/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        }).then(async (res) => {
            const updatedPost = await res.json();
            if (!res.ok)
                throw new Error(Object.values(updatedPost)[0])
            dispatch(setLikes({ postId, userId }));
        }).catch(err => {
            console.error(err)
        });
    };

    const handleShare = async () => {
        const formData = new FormData();
        formData.append("postId", !isShared ? postId : post.share.ogPost._id); // if nested share, share root post
        formData.append("userId", userId);
        formData.append("description", 'to be implemented'); //TODO implement ui & backend

        await fetch(`${process.env.REACT_APP_HOSTURL}/posts/${postId}/share`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        }).then(async (res) => {
            const posts = await res.json();
            if (!res.ok)
                throw new Error(Object.values(posts)[0])
            dispatch(setPosts({ posts }));
        }).catch(err => console.error(err));
    }

    return (
        <WidgetWrapper m="1.5rem 0 0 0">

            {isShared && (
                <Box m='-.6rem 0 .5em .4rem' display='flex' alignItems='inherit' gap='1rem' sx={{ color: palette.neutral.mediumMain }}>
                    <FlexBetween gap='1rem'>
                        <CachedOutlined />
                        <Typography align='left' variant="subtitle1" >
                            {vfname + vlname !== sfname + slname ?
                                <Link href={`/profile/${post.user._id}`} underline='hover'>{`${sfname} ${slname}`}</Link>
                                : <Link  underline='none'>You</Link>
                            } shared this post
                        </Typography>
                    </FlexBetween>
                </Box>  )
            }
            <FlexBetween>
                <UserInfo
                    personId={postUserId}
                    name={`${firstName} ${lastName}`}
                    subtitle={new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: "numeric", hour: 'numeric', minute: 'numeric', hour12: true, weekday: 'short' }).format(new Date(createdAt))}
                    userPicturePath={userPicturePath}
                    isProfile={isProfile}
                />
                {(userId === postUserId && !isProfile)&&
                    (<Tooltip title='Edit post' disableInteractive>
                        <IconButton>
                            <EditOutlined sx={{ color: palette.primary.dark }} />
                        </IconButton>
                    </Tooltip>)
                }
            </FlexBetween>
            <Typography color={main} sx={{ mt: "1rem", whiteSpace: 'pre-line' }} paragraph={true} >
                {!showFullText && description.length > 202 ? (description.substring(0, 198) + '...') : description}
            </Typography>
            {description.length > 202 && (
                <Typography sx={{
                    "&:hover": {
                        color: palette.primary.main,
                        cursor: "pointer",
                    }
                }} onClick={() => setFullText(!showFullText)}>
                    {'Show ' + (showFullText ? 'less' : 'more')}
                </Typography>
            )}
            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`${process.env.REACT_APP_HOSTURL}/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem" onClick={() => setIsComments(!isComments)}>
                        <Tooltip title='Comment' disableInteractive>
                            <IconButton>
                                <ChatBubbleOutlineOutlined />
                            </IconButton>
                        </Tooltip>
                        <Typography sx={{ cursor: 'pointer' }}>{commentsCount}</Typography>
                    </FlexBetween>
                    <FlexBetween gap="0.3rem">
                        <Tooltip title='Share' disableInteractive>
                            <IconButton onClick={handleShare}>
                                <SvgIcon>
                                    <path d="M13 14h-2a8.999 8.999 0 0 0-7.968 4.81A10.136 10.136 0 0 1 3 18C3 12.477 7.477 8 13 8V2.5L23.5 11 13 19.5V14zm-2-2h4v3.308L20.321 11 15 6.692V10h-2a7.982 7.982 0 0 0-6.057 2.773A10.988 10.988 0 0 1 11 12z" />
                                </SvgIcon>
                            </IconButton>
                        </Tooltip>
                        <Typography>{shareCount}</Typography>
                    </FlexBetween>
                </FlexBetween>
                <FlexBetween gap='1rem'>
                    <IconButton>
                        <ShareOutlined />
                    </IconButton>
                </FlexBetween>
            </FlexBetween>

            {isComments && <CommentSection postId={postId} userId={userId} />}
        </WidgetWrapper>
    );
};

export default PostWidget;