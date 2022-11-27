const db = require('../models');

exports.GetOrderHistoriesAsync = async (id) => {
    try {
        var order_histories = await db.Order.findAll({
            where: { user_id: id },
            include: [
                { model: db.User },
                {
                    model: db.Cart,
                    include: { model: db.Product }
                }
            ],
            order: [['updatedAt', 'DESC']]
        });

        return await AggregationOrderHistory(order_histories);
    } catch (e) {
        console.log('Err', e);
        return [];
    }

}

exports.GetByIdAsync = async (id) => {
    try {
        var user = await db.User.findByPk(id);
        return user;
    } catch (e) {
        console.log('Err', e);
        return null;
    }
}


const AggregationOrderHistory = async (data) => {
    var results = [];
    if (!data) {
        return [];
    }

    results = data.map((order) => {
        var obj = { ...order.toJSON() };
        // order status
        obj.order_status = order.order_status ? "Success" : "Cancel";

        // user
        if (order.User != undefined && order.User != null) {
            obj.owner_name = order.User.first_name + " " + order.User.last_name;
            obj.email = order.User.email;
            obj.phone = order.User.phone;
        } else {
            obj.owner_name = "";
            obj.email = "";
            obj.phone = "";
        }


        // product
        obj.products = [];

        if (order.Carts != undefined && order.Carts != null) {
            obj.products = order.Carts.filter(x => x.Product != undefined && x.Product != null)
                .map(cart => ({
                    product_id: cart.Product.id,
                    product_name: cart.Product.product_name,
                    product_price: cart.Product.product_price,
                    amount: cart.amount,
                    total_price: (cart.amount * cart.Product.product_price),
                }));
        }

        obj.product_amount = order.Carts?.reduce((result, row) => result += row.amount, 0) ?? 0;
        obj.total_price = order.Carts?.reduce((result, row) => result += (row.Product.product_price * row.amount), 0) ?? 0;

        // Exclude column
        delete obj.User;
        delete obj.Carts;
        return obj;
    });

    return results;
}