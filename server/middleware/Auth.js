import jwt from 'jsonwebtoken'
import { UnAuthenticatedError } from "../Errors/index.js";


const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization 
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnAuthenticatedError('authentication invalid');
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        console.log(payload); //returns all info passed during jwt create
        req.user = {userId:payload.userId}
        next()
    } catch (error) {
         throw new UnAuthenticatedError("authentication invalid");
    }
}


export default auth;