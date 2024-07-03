import mongoose from "mongoose";

const Schema = mongoose.Schema;

const accessTokensSchema = new Schema({
    userAccessToken: String,
    pageAccessToken: String,
});

export default mongoose.model("AccessTokens", accessTokensSchema)