import { Box, Link, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";

const UserInfo = ({ personId, name, subtitle, userPicturePath, isProfile=false }) => {
    const { palette } = useTheme();
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
                    <Typography color={palette.neutral.medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
        </FlexBetween>
    );
};

export default UserInfo;