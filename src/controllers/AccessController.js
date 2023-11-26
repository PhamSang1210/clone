import AccessService from "../services/access.service.js";
import { StatusCodes } from "http-status-codes";
class AccessController {
    static async register(req, res, next) {
        if (!req.body.name) {
            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                msg: "Please fill Name",
            });
        }
        if (!req.body.email) {
            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                msg: "Please fill email",
            });
        }
        if (!req.body.password) {
            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                msg: "Please fill Password",
            });
        }

        // try {
        //     console.log("[P]:::[register]::: ", req.body);
        //     const newShop = await AccessService.register(req.body);
        //     return res.status(201).json(newShop);
        // } catch (error) {
        //     next(error);
        // }
        const newShop = await AccessService.register(req.body);
        return res.status(201).json(newShop);
    }
}

export default AccessController;
