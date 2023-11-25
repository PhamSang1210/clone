import { Schema, model } from "mongoose";
import { dateCreatedAt, dateUpdatedAt } from "../utils/index.js";

const DOCCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys";

const TokenKeyModel = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: "Shop",
        },
        privateKey: { type: String, required: true },
        publicKey: { type: String, required: true },
        refreshToken: { type: Array, default: [] },
        dateCreatedAt,
        dateUpdatedAt,
    },
    {
        collection: COLLECTION_NAME,
    }
);

export default model(DOCCUMENT_NAME, TokenKeyModel);
