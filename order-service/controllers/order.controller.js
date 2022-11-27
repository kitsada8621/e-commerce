const { InternalServer } = require("../../common/http");
const rules = require("../../common/rules");
const db = require("../models");
const { OrderAggregate } = require('../helpers/aggregation');
const { OrderValidation, ParamsValidation } = require('../validations/order.validation');
const OrderService = require('../services/orderService');

exports.Order = async (req, res) => {
    try {
        const { error } = await OrderValidation(req.body);
        if (error) {
            return res.status(422).json({
                status: 422,
                success: false,
                data: rules.unprocessable_entity,
                obj: error.details[0]
            });
        }

        var { sub } = req.claims;
        var user = await db.User.findByPk(sub);
        if (!user) {
            return res.status(404).json({
                status: 404,
                success: false,
                data: rules.user_not_found,
                obj: null
            });
        }

        var order = await OrderService.SaveAsync(req.body, user.id);
        return res.json(order);

        // var order = await db.Order.create({ ...req.body, user_id: sub, order_status: true, });
        // if (!order) {
        //     return res.status(500).json({
        //         status: 500,
        //         success: false,
        //         data: rules.order_failed,
        //         obj: null
        //     });
        // }

        // for (const row of req.body.products) {

        //     let product = await db.Product.findByPk(row.product_id);
        //     if (!product) {
        //         return res.status(404).json({
        //             status: 404,
        //             success: false,
        //             data: rules.product_not_found + `, product_id: ${row.product_id}`,
        //             obj: null
        //         });
        //     }

        //     if (product.product_count < row.amount) {
        //         return res.json({
        //             status: 200,
        //             success: false,
        //             data: `${product.product_name} is not enough, now there are ${product.product_count} left.`,
        //             obj: null
        //         });
        //     }

        //     var cart = await db.Cart.findOne({ where: { order_id: order.id, product_id: row.product_id } });
        //     if (!cart) {
        //         await db.Cart.create({ ...row, order_id: order.id });

        //         product.product_count -= row.amount;

        //     } else {

        //         product.product_count -= row.amount;
        //         row.amount = cart.amount + row.amount;
        //         await cart.update({ amount: row.amount });
        //     }
        //     await product.update({ product_count: product.product_count });
        // }

        // return res.json({
        //     status: 200,
        //     success: true,
        //     data: rules.success,
        //     obj: null
        // });

    } catch (e) {
        console.log('Err', e);
        return res.status(500).json(InternalServer);
    }
}

exports.CancelOrder = async (req, res) => {
    try {

        var { error } = await ParamsValidation(req.params);
        if (error) {
            return res.status(422).json({
                status: 422,
                success: false,
                data: rules.unprocessable_entity,
                obj: null
            });
        }

        var order = await db.Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({
                status: 404,
                success: false,
                data: rules.invalid_order,
                obj: null
            });
        }

        await order.update({ order_status: false });
        return res.json({
            status: 200,
            success: true,
            data: rules.success,
            obj: null
        });

    } catch (e) {
        console.log('Err', e);
        return res.status(500).json(InternalServer);
    }
}

exports.OrderDetails = async (req, res) => {
    try {

        var { error } = await ParamsValidation(req.params);
        if (error) {
            return res.status(422).json({
                status: 422,
                success: false,
                data: rules.unprocessable_entity,
                obj: null
            });
        }

        var order = await db.Order.findByPk(req.params.id, {
            attributes: { exclude: ['user_id'] },
            include: [
                {
                    model: db.User,
                    attributes: {
                        exclude: ['password', 'remember_token', 'role', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: db.Cart,
                    attributes: ['id', 'order_details', 'amount'],
                    include: {
                        model: db.Product,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    }
                }
            ]
        });

        if (!order) {
            return res.status(404).json({
                status: 404,
                success: false,
                data: rules.invalid_order,
                obj: null
            });
        }

        order = await OrderAggregate(order);

        return res.json({
            status: 200,
            success: false,
            data: rules.success,
            obj: order
        });


    } catch (e) {
        console.log('Err', e);
        return res.status(500).json(InternalServer);
    }
}