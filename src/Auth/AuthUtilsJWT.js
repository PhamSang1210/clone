import jwt from "jsonwebtoken";
import keyTokenModel from "../model/keyToken.model.js";

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
}

export default AuthUtilsJWT;
