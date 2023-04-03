import {
    AutoGraphOutlined,
    CachedOutlined,
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Link, Tooltip, Typography, useTheme } from "@mui/material";
import CommentSection from "components/Comments";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLikes } from "state";

const PostWidget = ({
    postId,
    postUserId,
    userId, // id of viewer
    name,
    description,
    datetime,
    picturePath,
    userPicturePath,
    likes,
    commentsCount,
    views,
}) => {
    const [isComments, setIsComments] = useState(false);
    const [showFullText, setFullText] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    // const userId = useSelector((state) => state.user._id);
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
    // if(isComments){
    //     console.log(commentCount,comments)
    //     console.log(JSON.parse(JSON.stringify(userId)))
    // }

    return (
        <WidgetWrapper m="2rem 0">

            {name == 'ai bot' && (
            <Box m='-.6rem 0 .5em .4rem' display='flex' alignItems='inherit' gap='1rem' sx={{ color: palette.neutral.mediumMain }}>
                <FlexBetween gap='1rem'>
                    <CachedOutlined />
                    <Typography align='left' variant="subtitle1" >
                        <Link href={`/profile/${postUserId}`} underline='hover'>{name}</Link>
                        {' shared this post'}
                    </Typography>
                </FlexBetween>
            </Box>)}

            <Friend
                friendId={postUserId}
                name={name}
                subtitle={datetime}
                userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{ mt: "1rem",whiteSpace: 'pre-line' }} paragraph={true} >
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
                        <Tooltip title='Comment'>
                            <IconButton>
                                <ChatBubbleOutlineOutlined />
                            </IconButton>
                        </Tooltip>
                        <Typography sx={{ cursor: 'pointer' }}>{commentsCount}</Typography>
                    </FlexBetween>
                </FlexBetween>
                <FlexBetween gap='1rem'>
                    <Tooltip title='Impressions'>
                        <FlexBetween gap="0.3rem">
                            <AutoGraphOutlined />
                            <Typography>{likeCount + commentsCount + views}</Typography>
                        </FlexBetween>
                    </Tooltip>
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