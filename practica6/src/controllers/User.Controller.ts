import { Request, Response } from "express";
import User from "../models/Users";

export const createAccount = async (req: Request, res: Response) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({message: 'Datos del usuario recibidos con exito'});
}