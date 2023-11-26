import apiKeyModel from "../model/apiKey.model.js";
import ApiKeyService from "../services/apiKey.service.js";

const HEADER = {
    apiKey: "x_api_key",
    AUTHENZITION: "authenzition",
};

class CheckAuth {
    static async apiKey(req, res, next) {
        try {
            const key = req.headers[HEADER.apiKey]?.toString();
            if (!key) {
                return res
                    .status(403)
                    .json({ code: 403, msg: "FORBIDDEN ERROR !!!!" });
            }
            //Check Key in database
            const objKey = await ApiKeyService.findByKey({ key });
            if (!objKey) {
                return res.status(403).json({
                    code: 403,
                    msg: "[KEY] FORBIDDEN ERROR !!!",
                });
            }
            req.objKey = objKey;
            return next();
        } catch (error) {
            return res.status(403).json(error);
        }
    }

    static premission(premissions) {
        return (req, res, next) => {
            if (!req.objKey.premissions) {
                return res.status(403).json({
                    code: 403,
                    msg: "ERROR AUTHENZITION !!!",
                });
            }

            const key = req.objKey.premissions.includes(premissions);

            if (!key) {
                return res.status(200).json({
                    code: 200,
                    msg: "KEY PREMISSION INCORRECT !!!",
                });
            }

            return next();
        };
    }

    static asyncHandler(fn) {
        return (req, res, next) => {
            fn(req, res, next).catch(next);
        };
    }
}

export default CheckAuth;
