import cors from "cors"
import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";

import InstagramRoutes from "./routes/instagramWebhookRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(InstagramRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  const statusCode = err.statusCode;

  if (!statusCode) {
    err.statusCode = 422;
  }
  return res.status(statusCode).json({
    message: err.message,
  });
});

export default app;