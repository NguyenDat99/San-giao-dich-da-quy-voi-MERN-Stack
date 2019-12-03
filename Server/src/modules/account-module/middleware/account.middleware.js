import Validator from 'validator';
import ValidationError from '../../../errors-handle/validation.errors';
import {
    CreateAccountErrors,
    AccountLoginErrors,
    MeAccountErrors,
    UpdateAccountErrors,
    GetAccountsErrors,
    GetInfoAccountByManagerErrors,
    BlockUnblockAccountErrors,
    DeleteAccountErrors,
    ChangePasswordErrors,
} from '../error-codes/account.error-codes';

const createAccountInput = (req, res, next) => {
    const data = req.body;
    try {
        if (!data) throw CreateAccountErrors.NO_DATA;
        if (!data.email) throw CreateAccountErrors.NO_EMAIL;
        if (!Validator.isEmail(data.email)) throw CreateAccountErrors.INVALID_EMAIL;
        if (!data.password) throw CreateAccountErrors.NO_PASSWORD;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const logInAccountInput = (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!req.body) throw AccountLoginErrors.NO_DATA;
        if (!email) throw AccountLoginErrors.NO_EMAIL;
        if (!password) throw AccountLoginErrors.NO_PASSWORD;
        if (!Validator.isEmail(email)) throw AccountLoginErrors.INVALID_EMAIL;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const meInput = (req, res, next) => {
    const { jwt } = req.headers;
    try {
        if (!jwt) throw MeAccountErrors.NO_TOKEN;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const reduceInput = (req, res, next) => {
    const data = req.body;
    const inputData = Object.keys(data).reduce((result, key) => {
        if (data[key]) {
            result[key] = data[key];
        }
        return result;
    }, {});
    req.body = inputData;
    return next();
};

const updateAccountInput = (req, res, next) => {
    const { jwt } = req.headers;
    const { firstname, lastname, avatar } = req.body;
    try {
        if (!req.body) throw UpdateAccountErrors.NO_DATA;
        if (!jwt) throw MeAccountErrors.NO_TOKEN;
        req.body = { firstname, lastname, avatar };
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const getAccountsInput = (req, res, next) => {
    const { jwt } = req.headers;
    try {
        if (!jwt) throw GetAccountsErrors.NO_TOKEN;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const getAccountInfoByManagerInput = (req, res, next) => {
    const { jwt } = req.headers;
    try {
        if (!jwt) throw GetInfoAccountByManagerErrors.NO_TOKEN;
        if (!req.params.id) throw GetInfoAccountByManagerErrors.NO_ACCOUNT_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const blockUnblockAccountInput = (req, res, next) => {
    const { jwt } = req.headers;
    try {
        if (!jwt) throw BlockUnblockAccountErrors.NO_TOKEN;
        if (!req.params.id) throw BlockUnblockAccountErrors.NO_ACCOUNT_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const deleteAccountInput = (req, res, next) => {
    const { jwt } = req.headers;
    try {
        if (!jwt) throw DeleteAccountErrors.NO_TOKEN;
        if (!req.params.id) throw DeleteAccountErrors.NO_ACCOUNT_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const changePasswordInput = (req, res, next) => {
    const { email, oldPassword, newPassword } = req.body;
    const { jwt } = req.headers;
    try {
        if (!req.body) throw ChangePasswordErrors.NO_DATA;
        if (!jwt) {
            if (!email) throw ChangePasswordErrors.INVALID_INPUT;
            else if (!Validator.isEmail(email)) throw ChangePasswordErrors.NO_EMAIL;
        } else if (!Validator.isJWT(jwt)) throw ChangePasswordErrors.NO_TOKEN;
        if (!oldPassword) throw ChangePasswordErrors.INVALID_OLD_PASSWORD;
        if (!newPassword) throw ChangePasswordErrors.INVALID_NEW_PASSWORD;
        if (!Validator.isByteLength(oldPassword, {
            min: 6,
            max: 15,
        })) throw ChangePasswordErrors.INVALID_PASSWORD;
        if (!Validator.isByteLength(newPassword, {
            min: 6,
            max: 15,
        })) throw ChangePasswordErrors.INVALID_PASSWORD;
        if (oldPassword === newPassword) throw ChangePasswordErrors.SIMILAR_PASSWORD;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
export default {
    createAccountInput,
    logInAccountInput,
    meInput,
    reduceInput,
    updateAccountInput,
    getAccountsInput,
    getAccountInfoByManagerInput,
    blockUnblockAccountInput,
    deleteAccountInput,
    changePasswordInput,
};
