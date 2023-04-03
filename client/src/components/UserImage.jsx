import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

// const UserImage=({image,size='60px',alt='Picture'})=>{
//     const [loaded,setLoaded]=useState(false)
//     return (
//     <Box width={size} height={size}>
//         <img
//             style={{objectFit:'cover',borderRadius:'50%',display:loaded?'inline':'none'}}
//             width={size}
//             height={size}
//             // alt={alt+' img'}
//             src={`${process.env.REACT_APP_HOSTURL}/assets/${image}`}
//             onLoad={()=>setLoaded(true)}
//         />
//         {!loaded && <CircularProgress/>}
//     </Box>
//     )
// }
const UserImage=({image,size='60px',alt='Picture'})=>(
    <Box width={size} height={size}>
        <img
            style={{objectFit:'cover',borderRadius:'50%'}}
            width={size}
            height={size}
            alt={alt+' img'}
            src={`${process.env.REACT_APP_HOSTURL}/assets/${image}`}
        />
    </Box>
)

export default UserImage;