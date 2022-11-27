const { InternalServer } = require('../../common/http');
const rules = require("../../common/rules");
const db = require("../models");
const registerValidation = require("../validations/register.validation");
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    try {
        const { error } = await registerValidation(req.body);
        if (error) {
            return res.status(422).json({
                status: 422,
                success: false,
                data: rules.unprocessable_entity,
                obj: error.details[0]
            });
        }

        var salt = await bcrypt.genSaltSync(10);
        var password_hash = await bcrypt.hashSync(req.body.password, salt);

        var [_, created] = await db.User.findOrCreate({ where: { email: req.body.email }, defaults: { ...req.body, password: password_hash } })

        if (!created) {
            return res.status(200).json({
                status: 204,
                success: false,
                data: rules.user_already_exist,
                obj: null
            });
        }


        return res.json({
            status: 200,
            success: true,
            data: rules.success,
            obj: null
        });

    } catch (e) {
        console.log('Err:', e);
        return res.status(500).json(InternalServer);
    }
}