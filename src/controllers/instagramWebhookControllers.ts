import { NextFunction, Request, Response } from "express";
import "dotenv/config";

export const instagramController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mode = req.query["hub.mode"];
        const challenge = req.query["hub.challenge"];
        const verifyToken = req.query["hub.verify_token"];
        if (mode && mode === "subscribe" && verifyToken === process.env.VERIFY_TOKEN) {
            return res.status(200).send(challenge);
        }
    } catch (error:any){
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        return next(error);
    }
}

export const testController = async (req: Request, res: Response, next: NextFunction) => {
    console.log(process.env.VERIFY_TOKEN);
    res.status(200).send("test");
}