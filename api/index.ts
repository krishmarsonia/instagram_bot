import mongoose from "mongoose";
import app from "../src/app";
import "dotenv/config"

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => {
      console.log("server running at " + PORT);
    });
  })
  .catch((err) => console.log(err));

module.exports = app;
