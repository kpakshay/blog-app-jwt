import jwt from 'jsonwebtoken'
import User from '../models/userSchema.js'

const protect = async (req, res, next) => {
    const token = req.cookies.jwt
    if (!token) {
        return res.status(401).send("Unauthorized, no token provided");
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = await User.findById(decoded.userId)
        console.log(req.user,"hii rwe")
        next()
    } catch (err) {
        return res.status(401).send("Unauthorised, Invalid token")
    }
}

export default protect;