import Validator from 'validator';
import ValidationError from '../../../errors-handle/validation.errors';
import {
    CreateProductErrors,
    GetProductErrors,
    GetProductsErrors,
    UpdateProductErrors,
    BlockProductErrors
} from '../error-codes/product.error-codes';

const createProductInput = (req, res, next) => {
    const {jwt} = req.headers;
    const data = req.body;
    try {
        if (!data) throw CreateProductErrors.NO_DATA;
        if (!data.productName) throw CreateProductErrors.NO_NAME;
        // if (!data.price) throw CreateProductErrors.NO_PRICE;
        if (!data.categoryId) throw CreateProductErrors.NO_CATEGORY_ID;
        if (!Validator.isMongoId(data.categoryId)) throw CreateProductErrors.INVALID_CATEGORY_ID;
        if (!jwt) throw CreateProductErrors.NO_TOKEN;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const getAllProductInput = (req, res, next) => {
    const { jwt } = req.headers;
    try {
        if (!jwt) throw GetProductsErrors.NO_TOKEN;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const getAllProductInputByCategoryId = (req, res, next) => {
    const { jwt } = req.headers;
    const data = req.body;
    try {
        if (!jwt) throw GetProductsErrors.NO_TOKEN;
        if (!data.categoryId) throw CreateProductErrors.NO_CATEGORY_ID;
        if (!Validator.isMongoId(data.categoryId)) throw CreateProductErrors.INVALID_CATEGORY_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const getProductInput = (req, res, next) => {
    const { jwt } = req.headers;
    const productId = req.params.productId;
    try {
        if (!jwt) throw GetProductErrors.NO_TOKEN;
        if (!productId) throw GetProductErrors.NO_PRODUCT_ID;
        if (!Validator.isMongoId(productId)) throw GetProductErrors.INVALID_PRODUCT_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const updateProductInput = (req, res, next) => {
    const { jwt } = req.headers;
    const data= req.body;
    const productId = req.params.productId;
    try {
        if (!data) throw UpdateProductErrors.NO_DATA;
        if (!jwt) throw UpdateProductErrors.NO_TOKEN;
        if (!productId) throw UpdateProductErrors.NO_PRODUCT_ID;
        if (!Validator.isMongoId(productId)) throw UpdateProductErrors.INVALID_PRODUCT_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const blockProductInput = (req, res, next) => {
    const { jwt } = req.headers;
    const productId = req.params.productId;
    try {
        if (!jwt) throw BlockProductErrors.NO_TOKEN;
        if (!productId) throw BlockProductErrors.NO_PRODUCT_ID;
        if (!Validator.isMongoId(productId)) throw BlockProductErrors.INVALID_PRODUCT_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
export default {
    createProductInput,
    getAllProductInput,
    getProductInput,
    updateProductInput,
    blockProductInput,
    getAllProductInputByCategoryId
};
