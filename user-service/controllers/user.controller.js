const { InternalServer } = require("../../common/http");
const rules = require("../../common/rules");
const { GetOrderHistoriesAsync, GetByIdAsync } = require('../services/userService');

exports.Profile = async (req, res) => {
    try {
        const { sub } = req.claims;
        let user = await GetByIdAsync(sub);
        if (!user) {
            return res.status(404).json({
                status: 404,
                success: false,
                data: rules.user_not_found,
                obj: null
            });
        }

        return res.json({
            status: 200,
            success: true,
            data: rules.success,
            obj: user
        });

    } catch (e) {
        console.log('Err:', e);
        return res.status(500).json(InternalServer);
    }
}

exports.OrderHistories = async (req, res) => {
    try {

        var { sub } = req.claims;
        var order_histories = await GetOrderHistoriesAsync(sub);

        return res.json({
            status: 200,
            success: true,
            data: rules.success,
            obj: order_histories
        });


    } catch (e) {
        console.log('Err:', e);
        return res.status(500).json(InternalServer);
    }
}