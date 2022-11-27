var Joi = require('joi');
const { InternalServer } = require('../../common/http');


module.exports = async (req) => {
    try {
        return await Joi.object({
            email: Joi.string().required().max(255),
            password: Joi.string().required().max(255)
        }).validate(req);
    } catch (e) {
        console.log('InternalServer: ', e);
        return InternalServer;
    }
}