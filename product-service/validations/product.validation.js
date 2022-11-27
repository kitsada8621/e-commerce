var Joi = require('joi');

exports.ProductAllValidation = async (req) => {
    try {

        console.log('req', req);
        return await Joi.object({
            page: Joi.number().required().max(9999999999).allow(0),
            search: Joi.string().required().max(255).allow('', null),
            skip: Joi.number().allow(0).max(9999999999),
            limit: Joi.number().allow(0).max(9999999999)
        }).validate(req);

    } catch (e) {
        console.log('Err: ', e);
        return null;
    }
}

exports.AddProductValidation = async (req) => {
    try {
        return await Joi.object({
            product_name: Joi.string().required().max(255),
            product_price: Joi.number().required().max(9999999999),
            product_desc: Joi.string().required().max(1024).allow('', null),
            product_count: Joi.number().required().max(999999999).allow(0)
        }).validate(req);
    } catch (e) {
        console.log('Err: ', e);
        return null;
    }
}

exports.EditProductValidation = async (req) => {
    try {
        return await Joi.object({
            id: Joi.number().required().max(999999999),
            product_name: Joi.string().required().max(255),
            product_price: Joi.number().required().max(9999999999),
            product_desc: Joi.string().required().max(1024).allow('', null),
            product_count: Joi.number().required().max(999999999).allow(0)
        }).validate(req);
    } catch (e) {
        console.log('Err: ', e);
        return null;
    }
}

exports.IdValidation = async (req) => {
    try {
        return await Joi.object({
            id: Joi.number().required().max(999999999)
        }).validate(req);
    } catch (e) {
        console.log('Err: ', e);
        return null;
    }
}