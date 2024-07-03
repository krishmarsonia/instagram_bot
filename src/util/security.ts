import crypto from "crypto";
import "dotenv/config";

const algorithm = process.env.ALGORITHM;
const secret = process.env.SECRET_KEY;
const IV = process.env.IV;

if (!secret || !algorithm || !IV) throw new Error("Missing secret or algorithm");

const secretKey = crypto.scryptSync(secret, "salt", 24);
const iv = Buffer.from(IV, "hex");

export const encrypt = (data: string) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decrypt = (data: string) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}