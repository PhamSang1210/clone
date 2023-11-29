import { BadRequestResponse } from "../core/error.response.js";
import { CREATED } from "../core/success.response.js";
import { userValidate } from "../helpers/validation.js";
import AccessService from "../services/access.service.js";
import { SuccessResponse } from "../core/success.response.js";
class AccessController {
    static async login(req, res, next) {
        return new SuccessResponse({
            metaData: await AccessService.login(req.body),
        }).send(res);
    }
    static async register(req, res, next) {
        const { error } = userValidate(req.body);
        if (error) {
            const messageError = error.details[0].message;
            throw new BadRequestResponse(messageError);
        }

        new CREATED({
            message: "Register OK",
            metaData: await AccessService.register(req.body),
        }).send(res);
    }
}

export default AccessController;
