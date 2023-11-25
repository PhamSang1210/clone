"use strict";
import bcrypt, { genSalt } from "bcrypt";
import crypto from "crypto";
import shopModel from "../model/shop.model.js";
import KeyTokenService from "./keyToken.service.js";
import AuthUtilsJWT from "../Auth/AuthUtilsJWT.js";
import { getInfoData } from "../utils/index.js";

const ROLE = {
    SHOP: "SHOP",
    ADMIN: "ADMIN",
};

class AccessService {
    static async register({ name, email, password }) {
        try {
            // Check exists
            const nameShop = await shopModel.exists({ name }).lean();
            const emailShop = await shopModel.exists({ email }).lean();
            if (nameShop) {
                return {
                    code: 200,
                    msg: "Name exists !!!!!",
                };
            }
            if (emailShop) {
                return {
                    code: 200,
                    msg: "Email exists !!!!!",
                };
            }

            const salt = await genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            const newShop = await shopModel.create({
                name,
                email,
                password: hashPassword,
                role: [ROLE.SHOP],
            });

            if (newShop) {
                // Create PrivateKey,PublicKey  generateKeyPairSync
                // const { privateKey, publicKey } = crypto.generateKeyPairSync(
                //     "rsa",
                //     {
                //         modulusLength: 4096,
                //         publicKeyEncoding: {
                //             type: "pkcs1",
                //             format: "pem",
                //         },
                //         privateKeyEncoding: {
                //             type: "pkcs1",
                //             format: "pem",
                //         },
                //     }
                // );

                const privateKey = crypto.randomBytes(64).toString("hex");
                const publicKey = crypto.randomBytes(64).toString("hex");

                // Create Key to keyModel (Database)
                const tokenShop = await KeyTokenService.createToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey,
                });

                // console.log(`PublicKeyString : ${publicKeyString}`);

                //Create JWT
                const tokens = AuthUtilsJWT.createTokenPair(
                    {
                        name: newShop.name,
                        id: newShop._id,
                    },
                    publicKey,
                    privateKey
                );

                return {
                    code: 201,
                    msg: "Register Success <3",
                    metaData: {
                        shop: getInfoData(newShop, ["_id", "name", "email"]),
                        tokens,
                    },
                };
            }

            return {
                code: "401",
                msg: "Can't register",
            };
        } catch (error) {
            return {
                code: 403,
                msg: error,
            };
        }
    }
}

export default AccessService;
