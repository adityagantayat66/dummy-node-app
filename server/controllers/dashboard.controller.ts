import type { Request, Response } from "express";
import { all_users } from "../providers/data.js";

export const fetchUserData = (req: Request, res: Response) =>
{
    let status = 200;
    let data;
    const userData = res.locals.user;
    if(userData.role === 'majdoor')
    {
        const details = all_users.get(userData.email);
        if(details)
        {
            const {fullName, age, email} = details;
            data = {fullName, age, email, role: userData.role};
        }
        else
        {
            status = 404;
            data = 'No user found for the email.'
        }
    }
    else
    {
        if(!all_users.size)
        {
            data = "Koi majdoor nahi register hua h."
        }
        else
        {
            data = [...all_users.values()]
        }
    }
    return res.status(status).json(data);

}