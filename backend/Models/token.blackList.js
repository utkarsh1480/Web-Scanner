import mongoose from "mongoose";

const TokenBlackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 15  // auto-delete after 15 minutes (matches access token TTL)
    }
});

const TokenBlackList = mongoose.model("TokenBlackList", TokenBlackListSchema);
export default TokenBlackList;
