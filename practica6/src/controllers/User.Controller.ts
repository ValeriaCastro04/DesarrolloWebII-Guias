import { Request, Response } from "express";
import User from "../models/Users";

export const createAccount = async (req: Request, res: Response) => {
    const {name, password, email, username} = req.body;

    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(409).json({message: "User already exists for this email"});
        return;
    }

    const usernameExists = await User.findOne({username});
    if (usernameExists) {
        res.status(409).json({message: 'Username already exists'});
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).json({message: 'User created successfully'});
}