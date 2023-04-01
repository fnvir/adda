import { Avatar, Box } from "@mui/material";

const UserImage=({image,size='60px',alt='Picture'})=>(
    <Box width={size} height={size}>
        <Avatar
            style={{objectFit:'cover',borderRadius:'50%'}}
            width={size}
            height={size}
            alt={alt}
            src={`${process.env.REACT_APP_HOSTURL}/assets/${image}`}
        />
    </Box>
)

export default UserImage;