// Errors
// import nodemailer from 'nodemailer';
import AlreadyExistError from '../../../errors-handle/already-exist.errors';
import NotFoundError from '../../../errors-handle/not-found.errors';
import ValidationError from '../../../errors-handle/validation.errors';
import AccountRepository from '../repositories/account.repository';
// import ForbiddenError from '../../../errors-handle/forbidden.errors';
import NotImplementError from '../../../errors-handle/not-implemented.errors';
import Unauthorized from '../../../errors-handle/unauthorized.errors';
import {
    AccountRole, PasswordDefault, AccountStatus,
} from '../commons/account-status.common';
// Util
import { GenerateToken, VerifyToken } from '../../../utils/jwt.util';
// Commom - Code
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


const create = async (req, res) => {
    const { email,password } = req.body;
    try {
        const existed = await AccountRepository.isExistedEmail(email);
        if (existed) throw new AlreadyExistError(CreateAccountErrors.EMAIL_ALREADY_EXIST);
        const account = await AccountRepository.create({ email, password });
        if (!account) throw new NotImplementError(CreateAccountErrors.CREATE_FAIL);
        return res.onSuccess({
            message: 'create success',
        });
    } catch (error) {
        return res.onError(error);
    }
};



const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const account = await AccountRepository.getAccountByEmail(email);
        if (!account) throw new NotFoundError(AccountLoginErrors.EMAIL_NEVER_EXIST);
        // compare password
        const isMatchPassword = await account.comparePassword(password);
        if (!isMatchPassword) throw new ValidationError(AccountLoginErrors.WRONG_PASSWORD);
        const jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(account));
        if (!jwt) throw new NotImplementError(AccountLoginErrors.CREATE_TOKEN_FAIL);
        return res.onSuccess({
            jwt,
        });
    } catch (error) {
        return res.onError(error);
    }
};

const me = async (req, res) => {
    const { jwt } = req.headers;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(MeAccountErrors.AUTH_FAIL);
        const account = await AccountRepository.getAccountById(authenData.accountId);
        if (!account) throw new NotFoundError(MeAccountErrors.INVALID_ACCOUNT);
        return res.onSuccess({
            firstname: account.firstname,
            lastname: account.lastname,
            avatar: account.avatar,
            email: account.email
        });
    } catch (error) {
        return res.onError(error);
    }
};

const updateInfo = async (req, res) => {
    const { jwt } = req.headers;
    const data = req.body;
    try {
        // Get more confiditons if has
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(UpdateAccountErrors.AUTH_FAIL);
        const updated = await AccountRepository.updateInfo(authenData.accountId, data);
        if (!updated) throw new NotImplementError(UpdateAccountErrors.UPDATED_FAILURE);
        const account = await AccountRepository.getAccountById(authenData.accountId);
        if (!account) throw new NotFoundError(UpdateAccountErrors.GET_FAIL);
        return res.onSuccess({
            firstname: account.firstname,
            lastname: account.lastname,
            avatar: account.avatar,
            email: account.email,
        });
    } catch (error) {
        return res.onError(error);
    }
};

const getAccounts = async (req, res) => {
    const { jwt } = req.headers;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(GetAccountsErrors.AUTH_FAIL);//
        if (authenData.role !== AccountRole.MANAGER) {
            throw new Unauthorized(GetAccountsErrors.NO_RIGHT);
        }
        const accounts = await AccountRepository.getAccounts();
        if (!accounts) {
            throw new NotFoundError(GetAccountsErrors.GET_FAIL);
        }
        const result = accounts.map((account) => {
            const accountInfo = {};
            accountInfo.firstname = account.firstname;
            accountInfo.lastname = account.lastname;
            accountInfo.avatar = account.avatar;
            accountInfo.status = account.status;
            accountInfo.email = account.email;
            return accountInfo;
        });
        return res.send({
            data: result,
            success: 'ok'
        });
    } catch (error) {
        return res.onError(error);
    }
};

const getAccountInfoByManager = async (req, res) => {
    const { jwt } = req.headers;
    const accountId = req.params.id;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(GetInfoAccountByManagerErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) {
            throw new Unauthorized(GetInfoAccountByManagerErrors.NO_RIGHT);
        }
        const accountInfo = await AccountRepository.getAccountById(accountId);
        if (!accountInfo) throw new NotFoundError(GetInfoAccountByManagerErrors.GET_FAIL);
        return res.onSuccess({
            firstname: accountInfo.firstname,
            lastname: accountInfo.lastname,
            email: accountInfo.email,
            status: accountInfo.status,
            isDeleted: accountInfo.isDelete
        });
    } catch (error) {
        return res.onError(error);
    }
};
const blockAccount = async (req, res) => {
    const { jwt } = req.headers;
    const accountId = req.params.id;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(BlockUnblockAccountErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) {
            throw new Unauthorized(BlockUnblockAccountErrors.NO_RIGHT);
        }
        const account = await AccountRepository.isExistedAccount(accountId);
        if (!account) throw new NotFoundError(BlockUnblockAccountErrors.NO_ACCOUNT);
        if (account.status === AccountStatus.ACTIVE) {
            const isBlock = await AccountRepository.blockAccount(accountId, AccountStatus.BLOCKED);
            if (!isBlock) throw new NotImplementError(BlockUnblockAccountErrors.BLOCK_FAIL);
        }
        if (account.status === AccountStatus.BLOCKED) {
            const isUnblock = await AccountRepository.blockAccount(accountId, AccountStatus.ACTIVE);
            if (!isUnblock) throw new NotImplementError(BlockUnblockAccountErrors.UNBLOCK_FAIL);
        }
        const result = await AccountRepository.getAccountAfterBlock(accountId);
        if (!result) throw new NotFoundError(BlockUnblockAccountErrors.GET_FAIL);
        return res.onSuccess({
            firstname: result.firstname,
            lastname: result.lastname,
            avatar: result.avatar,
            email: result.email,
            status: result.status,
            isDeleted: result.isDeleted,
        });
    } catch (error) {
        return res.onError(error);
    }
};

const deleteAccount = async (req, res) => {
    const { jwt } = req.headers;
    const accountId = req.params.id;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(DeleteAccountErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) {
            throw new Unauthorized(DeleteAccountErrors.NO_RIGHT);
        }
        const result = await AccountRepository.deleteAccount(accountId);
        if (!result) throw new NotImplementError(DeleteAccountErrors.DELETE_FAIL);
        return res.onSuccess({ message: result });
    } catch (error) {
        return res.onError(error);
    }
};

// const forgotPassword = async (req, res) => {
//     const { email } = req.body;
//     try {
//         const existed = await AccountRepository.getAccountByEmail(email);
//         if (!existed) throw new NotFoundError(ForgotPasswordErrors.EMAIL_NEVER_EXIST);
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             port: 993,
//             requireSSL: true,
//             host: 'imap.gmail.com',
//             auth: {
//                 user: EmailHost.user,
//                 pass: EmailHost.password,

//             }
//         });

//         const mailOptions = {
//             from: EmailHost.user,
//             to: email,
//             subject: 'New password',
//             text: 'New password is ' + PasswordDefault
//         };
//         transporter.sendMail(mailOptions, (error) => {
//             if (error) {
//                 throw new NotImplementError(ForgotPasswordErrors.ERROR_SYSTEM);
//             }
//         });
//         //hashedpassword = HastText(PasswordDefault);
//         const result = await AccountRepository.changePassword(email, PasswordDefault);
//         if (!result) throw new NotImplementError(ForgotPasswordErrors.ERROR_SYSTEM);
//         return res.onSuccess({ message: 'check your email' });
//     } catch (error) {
//         return res.onError(error);
//     }
// };
const changePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    const { jwt } = req.headers;
    let existed;
    try {
        if (!jwt) {
            existed = await AccountRepository.isExistedEmail(email);
            if (!existed) throw new NotFoundError(ChangePasswordErrors.EMAIL_NEVER_EXIST);
        } else {
            const authenData = VerifyToken(jwt); if (!authenData) throw new NotImplementError(ChangePasswordErrors.AUTH_FAIL);
            existed = await AccountRepository.isExistedAccount(authenData.accountId);
            if (!existed) throw new NotFoundError(ChangePasswordErrors.ACCOUNT_NEVER_EXIST);
        }
        const isMatchPassword = await existed.comparePassword(oldPassword);
        if (!isMatchPassword) throw new ValidationError(ChangePasswordErrors.WRONG_PASSWORD);
        const result = await AccountRepository.changePassword(existed._id, newPassword);
        if (!result) throw new NotImplementError(ChangePasswordErrors.CHANGE_FAIL);
        const newJwt = GenerateToken(AccountRepository.getPayloadJwtSchema(existed));
        if (!newJwt) throw new NotImplementError(AccountLoginErrors.CREATE_TOKEN_FAIL);
        return res.onSuccess({ newJwt });
    } catch (error) {
        return res.onError(error);
    }
};

export default {
    create,
    login,
    me,
    updateInfo,
    getAccounts,
    getAccountInfoByManager,
    blockAccount,
    deleteAccount,
    changePassword,
};
