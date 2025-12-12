import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../providers/data.js";
import type { NextFunction, Request, Response } from 'express';

export function isAuthenticated(req: Request, res: Response, next: NextFunction)
{
    const token = req.headers.authorization?.split(' ')[1];

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
            res.locals.user = decodedToken;
            next()
        })
    }
}