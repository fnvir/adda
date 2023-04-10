import { Avatar} from "@mui/material";

const colors=['#43111e', '#a0e0c4', '#5b9afd', '#cd98bb', '#3a90a1', '#682cc5', '#bf591d', '#8bafe1', '#2b6355', '#737337', '#fb5133', '#ff7b53', '#403A66', '#212570', '#f08e0a', '#d8a217', '#3c3484', '#b40eed', '#0f4faf', '#3c2d37', '#22aba8', '#c5025b', '#afa5fe', '#ae2f00', '#2f3d00', '#263960']

const UserImage=({image,size='60px',alt='Picture'})=>(
    <Avatar
        style={{objectFit:'cover',borderRadius:'50%'}}
        // width={size}
        // height={size}
        alt={alt}
        src={`${process.env.REACT_APP_HOSTURL}/assets/${image}`}
        sx={{ 
            bgcolor: colors[alt.toUpperCase().charCodeAt(0)-65],
            color:'white',
            width: size,
            height: size
        }}
    />
)

export default UserImage;