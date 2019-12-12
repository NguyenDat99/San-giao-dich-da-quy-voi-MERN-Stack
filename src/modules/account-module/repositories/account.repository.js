import AccountSchema from '../models/account.model';
import { AccountStatus } from '../commons/account-status.common';

const isExistedEmail = async (email) => {
    const result = await AccountSchema.findOne({ email, status: AccountStatus.ACTIVE, isDeleted: false, });
    return result;
};

const isExistedAccount = async (accountId) => {
    const result = await AccountSchema.findOne({ _id: accountId, isDeleted: false });
    return result;
};
const create = async (data) => {
    const result = await AccountSchema.create(data);
    return result;
};

const getAccountByEmail = async (email) => {
    const result = await AccountSchema.findOne({ email, status: AccountStatus.ACTIVE, isDeleted: false });
    return result;
};

const getPayloadJwtSchema = (account) => {
    return {
        accountId: account._id,
        role: account.role,
    };
};

const getAccountById = async (accountId) => {
    const result = await AccountSchema.findOne({ _id: accountId, status: AccountStatus.ACTIVE, isDeleted: false, });
    return result;
};

const getAccountAfterBlock = async (accountId) => {
    const result = await AccountSchema.findOne({ _id: accountId, isDeleted: false, });
    return result;
};
const updateInfo = async (accountId, data) => {
    const result = await AccountSchema.updateOne({
        _id: accountId,
        isDeleted: false,
        status: AccountStatus.ACTIVE
    },
        { ...data });
    if (result.n === result.nModified) return true;
    return false;
};
const getAccounts = async () => {
    const result = await AccountSchema.find({ isDeleted: false });
    return result;
};
const blockAccount = async (accountId, status) => {
    const result = await AccountSchema.updateOne({
        _id: accountId,
        isDeleted: false
    },
    { status });
    if (result.n === result.nModified) return true;
    return false;
};
const deleteAccount = async (accountId) => {
    const result = await AccountSchema.updateOne({ _id: accountId },
        { isDeleted: true });
    if (result.n === result.nModified) return true;
    return false;
};
const changePassword = async (accountId, password) => {
    const account = await AccountSchema.findOne({ _id: accountId, isDeleted: false, status: AccountStatus.ACTIVE });
    account.password = password;
    const result = await account.save();
    return result;
};
export default {
    create,
    isExistedEmail,
    getAccountByEmail,
    getPayloadJwtSchema,
    getAccountById,
    updateInfo,
    getAccounts,
    blockAccount,
    deleteAccount,
    changePassword,
    isExistedAccount,
    getAccountAfterBlock,
};