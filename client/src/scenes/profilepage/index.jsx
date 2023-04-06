import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendList from "scenes/widgets/FriendList";
import ShowPosts from "scenes/widgets/ShowPosts";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const getUser = () => {
        fetch(`${process.env.REACT_APP_HOSTURL}/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        }).then(async(res)=>{
            const data = await res.json();
            if(!res.ok) throw new Error(Object.values(res)[0])
            setUser(data);
            document.title = `${data?.firstName||''} ${data?.lastName||''} - adda`
            console.log('hereee',data)
        }).catch(err=>console.log(err))
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;


    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={userId} picturePath={user.picturePath} isProfile />
                    <Box m="2rem 0" />
                    <FriendList userId={userId} othersFriendList/>
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <Box m="2rem 0" />
                    <ShowPosts userId={userId} isProfile />
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis='26%'>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ProfilePage;