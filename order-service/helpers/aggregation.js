exports.OrderAggregate = async (data) => {
    try {

        var result = null;
        if (!data) return null;

        result = {
            ...data.toJSON(),
            owner_name: `${data.User?.first_name ?? ""} ${data.User?.last_name ?? ""}`,
            email: data.User?.email ?? null,
            phone: data.User?.phone ?? null,
            order_status: data.order_status ? "Success" : "Cancel",
            products: await data.Carts?.map(row => ({
                product_id: row.Product?.id ?? 0,
                product_name: row.Product?.product_name ?? 0,
                product_price: row.Product?.product_price ?? 0,
                amount: row.amount,
                total: (row.amount * row.Product?.product_price ?? 0),
                details: row.order_details
            })) ?? [],
            product_amount: await data.Carts.reduce((result, row) => result += row.amount, 0) ?? 0,
            total_price: await data.Carts.reduce((result, row) => result += (row.Product.product_price * row.amount), 0) ?? 0,
        }

        delete result.Carts;
        delete result.User;




        return result;
    } catch (e) {
        console.log('Err: ', e);
        return null;
    }
}