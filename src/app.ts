import express, { NextFunction, Request, Response } from "express";

import InstagramRoutes from "./routes/instagramWebhookRoutes";

const app = express();

const PORT = process.env.PORT || 5050;

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

app.listen(PORT, () => {
  console.log("server running at " + PORT);
});
