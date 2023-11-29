import shopModel from "../model/shop.model.js";

const findByEmail = async ({
    email,
    select = {
        name: 1,
        email: 1,
        password: 2,
        status: 1,
        role: 1,
    },
}) => {
    return await shopModel.findOne({ email }).select(select).lean();
};

export { findByEmail };
