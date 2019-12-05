// Errors
// import nodemailer from 'nodemailer';
import AlreadyExistError from '../../../errors-handle/already-exist.errors';
import NotFoundError from '../../../errors-handle/not-found.errors';
import ValidationError from '../../../errors-handle/validation.errors';
import ProductRepository from '../repositories/product.repository';
import AccountRepository from '../../account-module/repositories/account.repository';
import NotImplementError from '../../../errors-handle/not-implemented.errors';
import Unauthorized from '../../../errors-handle/unauthorized.errors';
import CategoryRepository from '../../category/repositories/category.repository';
import {
    ProductStatus,
} from '../commons/product.status';
import {
    AccountRole,
} from '../../account-module/commons/account-status.common'
// Util
import { GenerateToken, VerifyToken } from '../../../utils/jwt.util';
// Commom - Code
import {
    CreateProductErrors,
    GetProductsErrors,
    GetProductErrors,
    UpdateProductErrors,
    BlockProductErrors
} from '../error-codes/product.error-codes';

const url = require('url');
const querystring = require('querystring');

const createProduct = async (req, res) => {
    const { jwt } = req.headers;
    const data = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(CreateProductErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) {
            throw new Unauthorized(CreateProductErrors.NO_RIGHT);
        }
        const isExisted = await CategoryRepository.getCategory(data.categoryId);
        if (!isExisted) throw CreateProductErrors.CATEGORY_NOT_EXISTED;
        const product = await ProductRepository.createProduct(data);
        if (!product) throw new NotImplementError(CreateProductErrors.CREATE_FAIL);
        return res.onSuccess(product);
    } catch (error) {
        return res.onError(error);
    }
};



const getAllProducts = async (req, res) => {
    const { jwt } = req.headers;
    let parsedUrl = url.parse(req.url);
    let parsedQs = querystring.parse(parsedUrl.query);
    const page = parsedQs.page
    const limit = parsedQs.limit
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(GetProductsErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) {
            throw new Unauthorized(GetProductsErrors.NO_RIGHT);
        }
        const products = await ProductRepository.getAllProducts(parseInt(page),parseInt(limit));
        if (!products) throw new NotFoundError(GetProductsErrors.GET_FAIL);
        return res.onSuccess(products);
    } catch (error) {
        return res.onError(error);
    }
};

const getAllProductInputByCategoryId = async (req, res) => {
    const { jwt } = req.headers;
    let parsedUrl = url.parse(req.url);
    let parsedQs = querystring.parse(parsedUrl.query);
    const page = parsedQs.page
    const limit = parsedQs.limit
    const data = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(GetProductsErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) {
            throw new Unauthorized(GetProductsErrors.NO_RIGHT);
        }
        const isExisted = await CategoryRepository.getCategory(data.categoryId);
        if (!isExisted) throw CreateProductErrors.CATEGORY_NOT_EXISTED;
        const products = await ProductRepository.getAllProductInputByCategoryId(parseInt(page),parseInt(limit),data.categoryId);
        if (!products) throw new NotFoundError(GetProductsErrors.GET_FAIL);
        return res.onSuccess(products);
    } catch (error) {
        return res.onError(error);
    }
};


const getProduct = async (req, res) => {
    const { jwt } = req.headers;
    const productId = req.params.productId;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(GetProductErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) {
            throw new Unauthorized(GetProductErrors.NO_RIGHT);
        }
        const product = await ProductRepository.getProduct(productId);
        if (!product) throw new NotFoundError(GetProductErrors.GET_FAIL);
        return res.onSuccess(product);
    } catch (error) {
        return res.onError(error);
    }
};

const updateProduct = async (req, res) => {
    const { jwt } = req.headers;
    const productId = req.params.productId
    const data = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(UpdateProductErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) {
            throw new Unauthorized(UpdateProductErrors.NO_RIGHT);
        }
        const updated = await ProductRepository.updateProduct(productId, data);
        if (updated != true) throw new NotImplementError(UpdateProductErrors.UPDATED_FAILURE);
        return res.onSuccess(updated);
    } catch (error) {
        return res.onError(error);
    }
};


const blockProduct = async (req, res) => {
    const { jwt } = req.headers;
    const productId = req.params.productId
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(BlockProductErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) {
            throw new Unauthorized(BlockProductErrors.NO_RIGHT);
        }
        const blocked = await ProductRepository.blockProduct(productId);
        if (blocked != true) throw new NotImplementError(BlockProductErrors.BLOCK_FAIL);
        return res.onSuccess(blocked);
    } catch (error) {
        return res.onError(error);
    }
};


const getProductByFilter = async (req, res) => {

};
export default {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    blockProduct,
    getProductByFilter,
};
