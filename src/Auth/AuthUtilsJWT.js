import jwt from "jsonwebtoken";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { AuthFailure } from "../core/error.response.js";

const HEADERS = {
    API_KEY: "x_api_key",
    CLIENT_ID: "x_client_id",
};

class AuthUtilsJWT {
    static createTokenPair(payload, publicKey, privateKey) {
        try {
            const accessToken = jwt.sign(payload, privateKey, {
                // algorithm: "RS256",
                expiresIn: "2d",
            });
            const refreshToken = jwt.sign(payload, privateKey, {
                // algorithm: "RS256",
                expiresIn: "7d",
            });
            jwt.verify(accessToken, publicKey, (err, decode) => {
                if (err) {
                    return {
                        code: 301,
                        err: 1,
                        msg: "error secret !!!",
                    };
                }
                console.log(`Decode Success: ${decode}`);
            });
            return {
                accessToken,
                refreshToken,
            };
        } catch (error) {
            return {
                code: 301,
                err: 1,
                alert: "Error createTokenPair !!!",
                msg: error,
            };
        }
    }

    static authentication() {
        asyncHandler(async (req, res, next) => {
            // 1.Check userId missing
            const userId = req.headers[HEADERS.CLIENT_ID];
            if (!userId) throw new AuthFailure("Invalid Request !!!");
            // 2.get AcccessToken
            // const keyStore =
        });
    }
}

export default AuthUtilsJWT;
