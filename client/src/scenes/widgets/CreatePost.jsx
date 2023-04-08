import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    ImageOutlined,
    MicOutlined,
    CloseOutlined,
    VideoCameraBackOutlined
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
    Grid,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const CreatePost = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id, firstName } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) formData.append("picture", image);

        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
        setIsImage(null)
    };
    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} alt={firstName} />
                <InputBase
                    placeholder="Share something with the world..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    multiline={true}
                    minRows={1}
                    maxRows={10}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1.5rem 2rem",
                    }}
                />
            </FlexBetween>
            {isImage && (

                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="2rem"
                >
                    <Grid container justifyContent="flex-end" mt='-2rem' pr='-4rem'>
                        <IconButton onClick={() => setIsImage(!isImage)} edge='end'>
                            <CloseOutlined />
                        </IconButton>
                    </Grid>

                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png,.gif"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween gap='2rem'>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Select / Drop Files</p>

                                    ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}

                                </Box>
                                {image && (
                                    <IconButton
                                        edge='end'
                                        onClick={() => setImage(null)}
                                    >
                                        <DeleteOutlined color="error"/>
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium}, display: !isNonMobileScreens ? 'none' : 'inline'  }}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                <FlexBetween gap="0.25rem">
                    <VideoCameraBackOutlined sx={{ color: mediumMain }} />
                    <Typography sx={{ display: !isNonMobileScreens ? 'none' : 'inline' }} color={mediumMain}>Clip</Typography>
                </FlexBetween>

                <FlexBetween gap="0.25rem">
                    <MicOutlined sx={{ color: mediumMain }} />
                    <Typography sx={{ display: !isNonMobileScreens ? 'none' : 'inline' }} color={mediumMain}>Audio</Typography>
                </FlexBetween>

                <FlexBetween gap="0.25rem">
                    <AttachFileOutlined sx={{ color: mediumMain }} />
                    <Typography sx={{ display: !isNonMobileScreens ? 'none' : 'inline' }} color={mediumMain}>Attachment</Typography>
                </FlexBetween>

                <Button
                    disabled={!(post || image)}
                    onClick={handlePost}
                    sx={{
                        color: 'black',
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default CreatePost;