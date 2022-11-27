var { InternalServer } = require('../../common/http');
var loginValidation = require("../validations/login.validation");
const rules = require("../../common/rules");
var db = require('../models');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    try {

        const { error } = await loginValidation(req.body);
        if (error) {
            return res.status(422).json({
                status: 422,
                success: false,
                data: rules.unprocessable_entity,
                obj: error.details[0]
            });
        }

        var user = await db.User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(401).json({
                status: 401,
                success: false,
                data: rules.invalid_username,
                obj: null
            });
        }

        if (!await bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                status: 401,
                success: false,
                data: rules.invalid_password,
                obj: null
            });
        }

        // Generate Token
        var token = await jwt.sign({ sub: user.id }, process.env.JWT_KEY, {
            expiresIn: process.env.JWT_EXPIRED
        });

        if (!token) {
            return res.status(500).json(InternalServer);
        }

        return res.json({
            status: 200,
            success: true,
            data: "Success",
            obj: {
                ...user.toJSON(),
                access_token: token,
                token_type: 'Bearer'
            }
        });

    } catch (e) {
        console.log('Err:', e);
        return res.status(500).json(InternalServer);
    }
}

