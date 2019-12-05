import Validator from 'validator';
import ValidationError from '../../../errors-handle/validation.errors';
import {
    CreateCategoyErrors,
    GetAllCategoriesErrors,
    GetCategoryErrors,
    UpdateCategoryErrors,
    BlockCategoryErrors,
} from '../error-codes/category.error-codes';

const createCategoryInput = (req, res, next) => {
    const {jwt} = req.headers;
    const data = req.body;
    try {
        if (!data) throw CreateCategoyErrors.NO_DATA;
        if (!data.categoryName) throw CreateCategoyErrors.NO_CATEGORY_NAME;
        if (!jwt) throw CreateCategoyErrors.NO_TOKEN;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const getAllCategoryInput = (req, res, next) => {
    const { jwt } = req.headers;
    try {
        if (!jwt) throw GetAllCategoriesErrors.NO_TOKEN;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const getCategoryInput = (req, res, next) => {
    const { jwt } = req.headers;
    const category_id = req.params.category_id;
    try {
        if (!jwt) throw GetCategoryErrors.NO_TOKEN;
        if (!category_id) throw GetCategoryErrors.NO_ID;
        if (!Validator.isMongoId(category_id)) throw GetCategoryErrors.INVALID_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const updateCategoryInput = (req, res, next) => {
    const { jwt } = req.headers;
    const { categoryName } = req.body;
    const category_id = req.params.category_id;
    try {
        if (!categoryName) throw UpdateCategoryErrors.NO_CATEGORY_NAME;
        if (!jwt) throw UpdateCategoryErrors.NO_TOKEN;
        if (!category_id) throw UpdateCategoryErrors.NO_ID;
        if (!Validator.isMongoId(category_id)) throw UpdateCategoryErrors.INVALID_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const blockCategoryInput = (req, res, next) => {
    const { jwt } = req.headers;
    const category_id = req.params.category_id;
    try {
        if (!jwt) throw BlockCategoryErrors.NO_TOKEN;
        if (!category_id) throw BlockCategoryErrors.NO_ID;
        if (!Validator.isMongoId(category_id)) throw BlockCategoryErrors.INVALID_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
export default {
    createCategoryInput,
    getAllCategoryInput,
    getCategoryInput,
    updateCategoryInput,
    blockCategoryInput,
};
