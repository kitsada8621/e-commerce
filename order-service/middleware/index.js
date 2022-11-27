const { InternalServer } = require("../../common/http");
const rules = require("../../common/rules");
const jwt = require('jsonwebtoken');
const db = require("../models");

module.exports = async (req, res, next) => {
    try {

        var headers = req.headers['authorization']
        if (!headers) return res.status(401).json({ status: 401, success: false, data: rules.unauthorized, obj: null });

        const token = headers.split(' ')[1]
        if (!token) return res.status(401).json({ status: 401, success: false, data: rules.unauthorized, obj: null });

        var { data, error } = await jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
            if (err) {
                return { data: null, error: err.message };
            }

            return { data: decode, error: null };
        });

        if (error) {
            return res.status(401).json({ status: 401, success: false, data: error, obj: null });
        }

        var user = await db.User.findByPk(data.sub);
        if (!user) {
            return res.status(401).json({ status: 401, success: false, data: rules.unauthorized, obj: null });
        }

        req.claims = {
            sub: user.id,
            email: user.email
        };

        return next();

    } catch (e) {
        console.log('Err:', e);
        return InternalServer;
    }
}