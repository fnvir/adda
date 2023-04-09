import { Box, Link, Tooltip, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import timeDiff from "utils";
import { useState } from "react";

const UserInfo = ({ personId, name, subtitle=null, userPicturePath, isProfile=false, time=null }) => {
    const { palette } = useTheme();
    const [clicked,setclicked]=useState(false)
    const tym=new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: "numeric", hour: 'numeric', minute: 'numeric', hour12: true, weekday: 'short' }).format(new Date(time));
    const tymdiff = timeDiff(Date.now()-new Date(time))
    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="40px" alt={name} />
                <Box>
                    <Link
                        color={palette.neutral.dark}
                        variant="h5"
                        fontWeight="500"
                        underline='none'
                        sx={!isProfile && {
                            "&:hover": {
                                color: palette.neutral.light,
                                cursor: "pointer",
                            },
                        }}
                        href={!isProfile?`/profile/${personId}`:null}
                    >
                        {name}
                    </Link>
                    <Box sx={{display: 'flex',flexDirection: 'row', alignContent: 'flex-start' }} spacing={0}>
                        {time && 
                            <Tooltip title={!clicked?tym:tymdiff} disableInteractive>
                                <Typography color={palette.neutral.medium} onClick={()=>setclicked(!clicked)} fontSize="0.75rem">
                                    {clicked?tym:tymdiff}
                                </Typography>
                            </Tooltip>
                        }
                        <Typography color={palette.neutral.medium} fontSize="0.75rem">
                            {subtitle}
                        </Typography>
                    </Box>
                </Box>
            </FlexBetween>
        </FlexBetween>
    );
};

export default UserInfo;