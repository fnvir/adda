import { Box, Stack, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import { useTitle } from "components/setTitle";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/UserWidget";
import CreatePost from "scenes/widgets/CreatePost"
import Posts from "scenes/widgets/ShowPosts";
import FriendList from "scenes/widgets/FriendList";
import FriendSuggestions from "scenes/widgets/FriendSuggestions";

const HomePage=()=>{
    useTitle('adda – Home')
    const isNonMobileScreens=useMediaQuery('(min-width:1000px)')
    const {_id,picturePath} =useSelector((state)=>state.user)
    return(
        <Box>
            <Navbar/>
            <Box
                width='100%'
                padding='2rem 6%'
                display={isNonMobileScreens?'flex':'block'}
                gap='0.5rem'
                justifyContent='space-between '
            >
                <Box flexBasis={isNonMobileScreens?'26%':undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens?'42%':undefined}
                    mt={isNonMobileScreens?undefined:'2rem'}
                >
                    <CreatePost picturePath={picturePath} />
                    <Posts userId={_id} />
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis='26%'>
                        <Stack spacing={3}>
                            <FriendList userId={_id} />
                            <FriendSuggestions userId={_id} />
                        </Stack>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default HomePage;