import CategoryModel from '../model/category.model';
import { CategoryStatus } from '../commons/category.status';

const createCategory = async (data) => {
    const result = await CategoryModel.create(data);
    return result;
};

const getCategory = async (_id) => {
    const result = await CategoryModel.findOne({ _id, status: CategoryStatus.ACTIVE});
    return result;
};
const getAllCategories = async () => {
    const result = await CategoryModel.find();
    return result;
};

const updateCategory = async (_id, data) => {
    const result = await CategoryModel.updateOne({
        _id,
        status: CategoryStatus.ACTIVE
    },
        { ...data });
    if (result.n === result.nModified) return true;
    return false;
};

const blockCategory = async (_id) => {
    const result = await CategoryModel.updateOne({
        _id,
        status: CategoryStatus.ACTIVE
    },
        { status: CategoryStatus.UNACTIVE });
    if (result.n === result.nModified) return true;
    return false;
};

export default {
    createCategory,
    getCategory,
    getAllCategories,
    updateCategory,
    blockCategory,
};