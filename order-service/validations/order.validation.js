const Joi = require('joi');

exports.OrderValidation = async (req) => {
    try {
        return await Joi.object({
            name: Joi.string().required().max(255).allow('', null),
            address: Joi.string().required().max(1024),
            sub_district: Joi.string().required().max(255),
            district: Joi.string().required().max(255),
            province: Joi.string().required().max(255),
            zip_code: Joi.string().required().max(20),
            contact: Joi.string().required().max(255),
            products: Joi.array().items({
                product_id: Joi.number().required().max(999999999),
                amount: Joi.number().required().min(1).max(999999999).allow(0).default(0),
                order_details: Joi.string().required().max(1024).allow('', null)
            }).required()
        }).validate(req);
    } catch (e) {
        console.log('Err', e);
        return null;
    }
}

exports.ParamsValidation = async (req) => {
    try {

        return await Joi.object({
            id: Joi.number().required().max(999999999),
        }).validate(req);

    } catch (e) {
        console.log('Err', e);
        return null;
    }
}