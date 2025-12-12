import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../providers/data.js";

export function isAuthenticated(req, res, next)
{
    const token = req.headers.authorization.split(' ')[1];

    if(!token?.length)
    {
        console.log('length check')
        return res.status(401).send(token);
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
            console.log('here');
            next()
        })
    }
}