import { Types } from "mongoose";
import { asyncHandler } from "../helpers/asyncHandler.js";
import keyTokenModel from "../model/keyToken.model.js";

class KeyTokenService {
    static async createToken({ userId, publicKey, privateKey, refreshToken }) {
        try {
            // const token = await keyTokenModel.create({
            //     user: userId,
            //     publicKey,
            //     privateKey,
            // });
            // return token ? publicKey : null;
            const filter = {
                    user: userId,
                },
                update = {
                    publicKey,
                    privateKey,
                    refreshTokenUsed: [],
                    refreshToken,
                },
                // neu chua co thi insert
                // neu co roi thi update
                options = {
                    new: true,
                    upsert: true,
                };

            const tokens = await keyTokenModel.findOneAndUpdate(
                filter,
                update,
                options
            );

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return {
                code: "xxx",
                msg: "Can't create token !!!!!!!",
            };
        }
    }

    static async findByUserId({ userId }) {
        return await keyTokenModel.findOne({ user: userId }).lean();
    }
}

export default KeyTokenService;
