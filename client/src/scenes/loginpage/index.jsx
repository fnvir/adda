import { Box, Typography, useTheme,IconButton, useMediaQuery } from "@mui/material";
import { useDispatch} from 'react-redux'
import Form from "./Form";
import { changeMode} from "state";
import {DarkMode,LightMode} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useTitle } from "components/setTitle";


const LoginPage = ({pgtype=1}) => {
    useTitle('adda – sign up | log in')
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const dispatch=useDispatch()
    return (
        <Box>
            <Box
                width="100%"
                backgroundColor={theme.palette.background.alt}
                p="1rem 6%"
                textAlign="center"
            >
            <FlexBetween>
                <Typography fontWeight="bold" fontSize="32px" color="primary">
                    adda
                </Typography>
                <IconButton onClick={() => dispatch(changeMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: theme.palette.neutral.dark, fontSize: "25px" }} />
                        )}
                </IconButton>
            </FlexBetween>
            </Box>

            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                    Unlimited adddaaaa... !
                </Typography>
                <Form pgtype={pgtype}/>
            </Box>
        </Box>
    )
};

export default LoginPage;