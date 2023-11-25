import apiKeyModel from "../model/apiKey.model.js";

class ApiKeyService {
    static async findByKey({ key }) {
        try {
            const objKey = await apiKeyModel.findOne({ key }).lean();
            return objKey;
        } catch (error) {
            return {
                error: 1,
                msg: error,
            };
        }
    }
}

export default ApiKeyService;
