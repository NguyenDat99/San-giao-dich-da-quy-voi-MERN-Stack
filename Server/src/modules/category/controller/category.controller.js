// Errors
// import nodemailer from 'nodemailer';
import AlreadyExistError from '../../../errors-handle/already-exist.errors';
import NotFoundError from '../../../errors-handle/not-found.errors';
import ValidationError from '../../../errors-handle/validation.errors';
import CategoryRepository from '../repositories/category.repository';
import NotImplementError from '../../../errors-handle/not-implemented.errors';
import Unauthorized from '../../../errors-handle/unauthorized.errors';
import {
    CategoryStatus,
} from '../commons/category.status';
import {
    AccountRole,
} from '../../account-module/commons/account-status.common'
// Util
import { GenerateToken, VerifyToken } from '../../../utils/jwt.util';
// Commom - Code
import {
    CreateCategoyErrors,
    GetAllCategoriesErrors,
    GetCategoryErrors,
    UpdateCategoryErrors,
    BlockCategoryErrors,
} from '../error-codes/category.error-codes';


const createCategory = async (req, res) => {
    const { jwt } = req.headers;
    const { categoryName } = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(CreateCategoyErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) {
            throw new Unauthorized(CreateCategoyErrors.NO_RIGHT);
        }
        const category = await CategoryRepository.createCategory({ categoryName });
        if (!category) throw new NotImplementError(CreateCategoyErrors.CREATE_FAIL);
        return res.onSuccess(category);
    } catch (error) {
        return res.onError(error);
    }
};



const getAllCategories = async (req, res) => {
    const { jwt } = req.headers;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(GetAllCategoriesErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) {
            throw new Unauthorized(GetAllCategoriesErrors.NO_RIGHT);
        }
        const categories = await CategoryRepository.getAllCategories();
        if (!categories) throw new NotFoundError(GetAllCategoriesErrors.GET_FAIL);
        return res.onSuccess(categories);
    } catch (error) {
        return res.onError(error);
    }
};

const getCategory = async (req, res) => {
    const { jwt } = req.headers;
    const category_id = req.params.category_id;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(GetCategoryErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) {
            throw new Unauthorized(GetCategoryErrors.NO_RIGHT);
        }
        const category = await CategoryRepository.getCategory(category_id);
        if (!category) throw new NotFoundError(GetCategoryErrors.GET_FAIL);
        return res.onSuccess(category);
    } catch (error) {
        return res.onError(error);
    }
};

const updateCategory = async (req, res) => {
    const { jwt } = req.headers;
    const category_id = req.params.category_id
    const data = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(UpdateCategoryErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) {
            throw new Unauthorized(UpdateCategoryErrors.NO_RIGHT);
        }
        const updated = await CategoryRepository.updateCategory(category_id, data);
        if (updated != true) throw new NotImplementError(UpdateCategoryErrors.UPDATED_FAILURE);
        return res.onSuccess(updated);
    } catch (error) {
        return res.onError(error);
    }
};

const blockCategory = async (req, res) => {
    const { jwt } = req.headers;
    const category_id = req.params.category_id
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(BlockCategoryErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) {
            throw new Unauthorized(BlockCategoryErrors.NO_RIGHT);
        }
        const blocked = await CategoryRepository.blockCategory(category_id);
        if (blocked != true) throw new NotImplementError(BlockCategoryErrors.BLOCK_FAIL);
        return res.onSuccess(blocked);
    } catch (error) {
        return res.onError(error);
    }
};
export default {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    blockCategory,
};
