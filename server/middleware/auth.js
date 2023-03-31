import jwt from 'jsonwebtoken'

export const verifyToken = async(req,res,next)=>{
    try{    
        let token=req.header('Authorization')
        if(!token) return res.status(403).send('Access Denied')
        if(token.startsWith('Bearer '))
            token=token.slice(7,token.length).trimLeft();
        
        const verified= jwt.verify(token,process.env.JWT_SECRET)
        req.user = verified;
        next();
    } catch(err){
        console.error(err)
        res.status(500).json({error:err.message})
    }
}

export function checkStrength(pass){
    if(pass.length<8) return {strong:false,msg:'Password must be of at least 8 characters'};
    let x=false,y=false,z=false;
    for(let s of pass){
        if(s>='A' && s<='Z') x=true;
        else if(s>='a' && s<='z') y=true;
        else if(s>='0' && x<='9') z=true;
    }
    return {strong:(x&&y&&z),msg:`Must contain atleast 1 ${!x?'uppercase character':(!y?'lowercase character':'digit')}`}
}
