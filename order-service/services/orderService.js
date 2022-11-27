const db = require('../models');
const rules = require('../../common/rules');

const SaveOrderProductAsync = async (payload, order_id) => {

    var products = []
    // check product already exist
    for (let product of payload) {
        var find_product = await products.find(x => x.product_id == product.product_id);
        if (!find_product) {
            products.push({ ...product, order_id: order_id });
        } else {
            find_product.amount += product.amount;
        }
    }

    // check product count.
    for (let row of products) {
        let product = await db.Product.findByPk(row.product_id);
        if (!product) return { status: false, message: rules.product_not_found + `, product_id: ${row.product_id}` };
        if (product.product_count < row.amount) return { status: false, message: `${product.product_name} is not enough, now there are ${product.product_count} left.` };
    }

    // save or update
    for (let row of products) {
        var cart = await db.Cart.create({ ...row, order_id: order_id });
        if (cart != undefined && cart != null) {
            var product = await db.Product.findByPk(row.product_id);
            const product_count = product.product_count - row.amount;
            await product.update({ product_count: product_count });
        }
    }

    return { status: true, message: null }
}


const SaveAsync = async (payload, user_id) => {
    var order = await db.Order.create({ ...payload, user_id: user_id, order_status: true });
    if (order != undefined && order != null) {
        var product = await SaveOrderProductAsync(payload.products, order.id);
        if (!product.status) {
            return {
                status: 200,
                success: false,
                data: product.message,
                obj: null
            };
        }
    }
    return {
        status: 200,
        success: true,
        data: rules.success,
        obj: null
    }
}

module.exports = {
    SaveAsync: SaveAsync
}