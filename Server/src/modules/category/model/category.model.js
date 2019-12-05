import mongoose, {
    Schema
} from 'mongoose';
import {
    CategoryStatus
} from '../commons/category.status';

const CategorySchema = new Schema({
    categoryName: {
        type: String,
    },
    status: {
        type: String,
        default: CategoryStatus.ACTIVE,
    },
}, {
    versionKey: false,
    timestamps: true
});

export default mongoose.model('Category', CategorySchema);
