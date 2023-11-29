import Joi from "joi";

const userValidate = (data) => {
    const userSchema = Joi.object({
        name: Joi.string().lowercase().required(),
        email: Joi.string()
            .email()
            .lowercase()
            .required()
            .pattern(new RegExp("gmail.com")),
        password: Joi.string().min(4).max(32).required(),
    });

    return userSchema.validate(data);
};

export { userValidate };
