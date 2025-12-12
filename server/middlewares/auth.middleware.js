import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../providers/data.js";

export function isAuthenticated(req, res, next)
{
    const token = req.headers['Authorisation']?.split(' ')[1];
    if(!token?.length)
    {
        return res.status(401).send('You are not Authenticated. Please login');
    }
    else
    {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) =>
        {
            if(err)
            {
                return res.status(401).send('You are not Authenticated. Please login');        
            }
            req.user = decodedToken;
            next();
        })
    }
}