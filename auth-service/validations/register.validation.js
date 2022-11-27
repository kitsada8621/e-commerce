const Joi = require('joi');
const { InternalServer } = require('../../common/http');
module.exports = async (req) => {
    try {
        return await Joi.object({
            first_name: Joi.string().required().max(255),
            last_name: Joi.string().required().max(255),
            email: Joi.string().email().required().max(255),
            phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            password: Joi.string().required().min(6).max(255),
            password_confirm: Joi.any().valid(Joi.ref('password')).messages({
                'any.only': "the passwords do not match"
            })
        }).validate(req);
    } catch (e) {
        return InternalServer;
    }
}