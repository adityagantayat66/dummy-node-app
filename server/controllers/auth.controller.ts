import type { Request, Response } from "express";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { all_users, JWT_SECRET } from "../providers/data.js";

export async function login(req: Request, res: Response): Promise<void>
{
    let status = 200;
    let data;
    const payload = req.body;
    if(!all_users.has(payload.email))
    {
        status = 404;
        data = 'User not found. Please register'
    }
    else
    {
        const hash = all_users.get(payload.email)?.password || '';
        const isMatch = await bcrypt.compare(payload.password, hash);
        if(!isMatch)
        {
            status = 500;
            data = "Password is incorrect."
        }
        else
        {
            const token = jwt.sign({email: payload.email, role: 'user'}, JWT_SECRET,{
                expiresIn: '15m'
            });
            status = 200;
            data = {token, 'success': true};
        }
    }
    res.status(status).json(data);
}

export async function register(req: Request, res: Response): Promise<void>
{
    let status = 200;
    let data;
    const {email, fullName, age, password} = req.body;
    if(!email.length || !fullName.length || !age.length || !password.length)
    {
        status = 422;
        data = 'All fields are required.'
    }
    else if(isNaN(Number(age)) && !isFinite(Number(age)))
    {
        status = 422;
        data = 'Age must be a number.'
    }
    else if(all_users.has(email))
    {
        status = 500;
        data = 'Email already Exists'
    }
    else
    {
        const _id = crypto.randomUUID();
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        all_users.set(email, {email, fullName, age, password: hashedPassword, _id})
        status = 201;
        data = {'id': _id, 'success': true};
    }
    res.status(status).json(data);
}