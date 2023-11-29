"use strict";
import bcrypt, { genSalt } from "bcrypt";
import crypto from "crypto";
import shopModel from "../model/shop.model.js";
import KeyTokenService from "./keyToken.service.js";
import AuthUtilsJWT from "../Auth/AuthUtilsJWT.js";
import { getInfoData } from "../utils/index.js";
import { AuthFailure, BadRequestResponse } from "../core/error.response.js";
import { OK } from "../core/success.response.js";
import { findByEmail } from "./shop.service.js";

const ROLE = {
    SHOP: "SHOP",
    ADMIN: "ADMIN",
};

class AccessService {
    static async logout() {}
    static async login({ email, password, refreshToken = null }) {
        //1.Check email in db
        const foundShop = await findByEmail({ email });
        if (!foundShop) throw BadRequestResponse("Shop not registerd !!!");
        //match password
        const matchPassword = await bcrypt.compare(
            password,
            foundShop.password
        );

        if (matchPassword === false) {
            throw new AuthFailure("Authentication error !!!");
        }
        // 3.
        //  - generate privateKey publicKey
        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");
        //Variable
        const { _id: userId } = foundShop;
        // 4. Generate tokens
        const tokens = AuthUtilsJWT.createTokenPair(
            {
                email,
                id: userId,
            },
            publicKey,
            privateKey
        );
        // deloy data -> Database
        await KeyTokenService.createToken({
            userId,
            publicKey,
            privateKey,
            refreshToken: foundShop.refreshToken,
        });

        return {
            shop: getInfoData(foundShop, ["id", "name", "email"]),
            tokens,
        };
    }

    static async register({ name, email, password }) {
        // try {
        // Check exists
        const nameShop = await shopModel.exists({ name }).lean();
        const emailShop = await shopModel.exists({ email }).lean();

        if (nameShop) {
            throw new OK({ message: "ERROR: Name exists !!!" });
        }
        if (emailShop) {
            throw new BadRequestResponse("ERROR: Email exists !!!");
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
        // } catch (error) {
        //     return {
        //         code: 403,
        //         msg: error,
        //     };
        // }
    }
}

export default AccessService;
