import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import crypto from "crypto";

interface CustomError extends Error {
  statusCode: number;
}

import AccessTokens from "../model/accessTokens";
import { decrypt, encrypt } from "../util/security";
import axios from "axios";

export const instagramController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const mode = req.query["hub.mode"];
    const challenge = req.query["hub.challenge"];
    const verifyToken = req.query["hub.verify_token"];
    if (
      mode &&
      mode === "subscribe" &&
      verifyToken === process.env.VERIFY_TOKEN
    ) {
      return res.status(200).send(challenge);
    }
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

export const testController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(process.env.VERIFY_TOKEN);
  res.status(200).send("test");
};

export const postInstagramWebhookController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const body = req.body;
    if (body.entry) {
      const entry = body.entry[0];
      console.log(entry);
      const changes = entry.changes[0];
      console.log(changes);
      const DBAccessTokens = await AccessTokens.find();
      const encryptedPageAccessToken = DBAccessTokens[0].pageAccessToken;
      if (!encryptedPageAccessToken) {
        const error = new Error("Page Access Token Not Found") as CustomError;
        error.statusCode = 422;
        throw error;
      }
      const originalPageAccessToken = decrypt(encryptedPageAccessToken);

      await axios.post(
        `https://graph.facebook.com/${process.env.PAGEID}/messages?recipient={comment_id:${changes.value.id}}&message={"text":"How may I help you today?"}&access_token=${originalPageAccessToken}`
      );
    }
    return res.status(200).send("success");
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

export const rootController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res
      .status(200)
      .send(
        "<center><h1>Welcome to The Tetrad Digitech Instagram Bot</h1></center>"
      );
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};
