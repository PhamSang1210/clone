import keyTokenModel from "../model/keyToken.model.js";

class KeyTokenService {
    static async createToken({ userId, publicKey, privateKey }) {
        try {
            const token = await keyTokenModel.create({
                user: userId,
                publicKey,
                privateKey,
            });

            return token ? publicKey : null;
        } catch (error) {
            return {
                code: "xxx",
                msg: "Can't create token !!!!!!!",
            };
        }
    }
}

export default KeyTokenService;
