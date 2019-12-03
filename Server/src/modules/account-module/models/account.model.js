import mongoose, {
    Schema
} from 'mongoose';
import {
    AccountStatus, AccountRole
} from '../commons/account-status.common';
import { HashText, CompareTextAndHash } from '../../../utils/bcrypt.util';

const AccountSchema = new Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    avatar: {
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: AccountStatus.ACTIVE,
    },
    role: {
        type: String,
        default: AccountRole.STAFF,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
},{
         versionKey: false,
         timestamps: true
     });

async function preSaveUserModel(cb) {
    const user = this;
    if (!user.isModified('password')) return cb();
    try {
        const hash = await HashText(user.password);
        user.password = hash;
        return cb();
    } catch (error) {
        return cb(error);
    }
}
async function comparePasswordMethod(candidatePassword) {
    const isMatch = await CompareTextAndHash(candidatePassword, this.password);
    return isMatch;
}

AccountSchema.pre('save', preSaveUserModel);
AccountSchema.methods.comparePassword = comparePasswordMethod;

export default mongoose.model('Account', AccountSchema);
