import { Box } from "@mui/material";

const UserImage=({image,size='60px'})=>(
    <Box width={size} height={size}>
        <img
            style={{objectFit:'cover',borderRadius:'50%'}}
            width={size}
            height={size}
            alt='user img'
            src={`${process.env.REACT_APP_HOSTURL}/assets/${image}`}
        />
    </Box>
)

export default UserImage;