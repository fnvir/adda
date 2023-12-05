import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "scenes/navbar";
import Peoplelist from "scenes/search/searchpeople";
import SearchPosts from "./searchpost";
import { useTitle } from "components/setTitle";
import SearchComments from "./SearchComments";

const SearchResults = () => {
    useTitle('Search Results – adda')
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const {palette}=useTheme();
    console.log('main page')
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
                    <Box m="3rem 0" />
                    <Peoplelist />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Typography variant="h3" fontWeight="500" color={palette.neutral.dark}>
                            Related Posts
                        </Typography>
                    </Box>
                    <SearchPosts />
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis='26%'>
                        <SearchComments />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default SearchResults;