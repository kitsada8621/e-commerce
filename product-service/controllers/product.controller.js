const { InternalServer } = require('../../common/http');
const db = require('../models');
const Sequelize = require('sequelize');
const { ProductAllValidation, AddProductValidation, EditProductValidation, IdValidation } = require('../validations/product.validation');
const rules = require('../../common/rules');

exports.ProductAll = async (req, res) => {
    try {

        const { error } = await ProductAllValidation(req.query);
        if (error) {
            return res.status(422).json({
                status: 422,
                success: false,
                data: rules.unprocessable_entity,
                obj: error.details[0]
            });
        }

        var skip = parseInt(req.query.skip);
        var limit = parseInt(req.query.limit);

        var { rows, count } = await db.Product.findAndCountAll({
            where: {
                [Sequelize.Op.or]: {
                    product_name: { [Sequelize.Op.like]: `%${req.query.search}%` }
                }
            },
            order: [['updatedAt', 'DESC']],
            offset: skip,
            limit: limit
        });


        return res.json({
            status: 200,
            success: true,
            data: rules.success,
            obj: {
                page: req.query.page,
                total: count,
                limit: limit,
                products: rows
            }
        })


    } catch (e) {
        console.log('Err', e);
        return res.status(500).json(InternalServer);
    }
}

exports.AddProduct = async (req, res) => {
    try {
        const { error } = await AddProductValidation(req.body);
        if (error) {
            return res.status(422).json({
                status: 422,
                success: false,
                data: rules.unprocessable_entity,
                obj: error.details[0]
            });
        }

        const [product, created] = await db.Product.findOrCreate({
            where: { product_name: req.body.product_name },
            defaults: req.body
        });

        if (!created) {
            return res.json({
                status: 204,
                success: false,
                data: rules.product_already_exist,
                obj: null
            });
        }

        return res.status(201).json({
            status: 201,
            success: true,
            data: rules.success,
            obj: product
        });


    } catch (e) {
        console.log('Err', e);
        return res.status(500).json(InternalServer);
    }
}

exports.ProductById = async (req, res) => {
    try {

        const { error } = await IdValidation(req.params);
        if (error) {
            return res.status(422).json({
                status: 422,
                success: false,
                data: rules.unprocessable_entity,
                obj: error.details[0]
            });
        }

        var product = await db.Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({
                status: 404,
                success: false,
                data: rules.product_not_found,
                obj: null
            });
        }

        return res.json({
            status: 200,
            success: true,
            data: rules.success,
            obj: product
        });


    } catch (e) {
        console.log('Err', e);
        return res.status(500).json(InternalServer);
    }
}

exports.EditProduct = async (req, res) => {
    try {

        const { error } = await EditProductValidation({ ...req.body, ...req.params });
        if (error) {
            return res.status(422).json({
                status: 422,
                success: false,
                data: rules.unprocessable_entity,
                obj: error.details[0]
            });
        }


        var product = await db.Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({
                status: 404,
                success: false,
                data: rules.product_not_found,
                obj: null
            });
        }

        await product.update(req.body);

        return res.status(200).json({
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
exports.DeleteProduct = async (req, res) => {
    try {

        const { error } = await IdValidation(req.params);
        if (error) {
            return res.status(422).json({
                status: 422,
                success: false,
                data: rules.unprocessable_entity,
                obj: error.details[0]
            });
        }

        var product = await db.Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({
                status: 404,
                success: false,
                data: rules.product_not_found,
                obj: null
            });
        }

        await product.destroy();

        return res.json({
            status: 204,
            success: false,
            data: rules.success,
            obj: null
        });

    } catch (e) {
        console.log('Err', e);
        return res.status(500).json(InternalServer);
    }
}