import jwt from 'jsonwebtoken';

const generateToken =(res,payload)=>{
    const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'30d'})
    res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV!='development',
        sameStite:'strict',
        maxAge:30*24*60*1000
    })
}

export default generateToken;