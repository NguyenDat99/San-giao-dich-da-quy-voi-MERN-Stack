import ProductModel from '../models/product.models';
import { ProductStatus } from '../commons/product.status';

const createProduct = async (data) => {
    const result = await ProductModel.create(data);
    return result;
};

const getProduct = async (_id) => {
    const result = await ProductModel.findOne({ _id, status: ProductStatus.ACTIVE });
    return result;
};
const getAllProducts = async () => {
    const result = await ProductModel.find({ status: ProductStatus.ACTIVE });
    return result;
};

const updateProduct = async (_id, data) => {
    const result = await ProductModel.updateOne({
        _id,
        status: ProductStatus.ACTIVE
    },
        { ...data });
    if (result.n === result.nModified) return true;
    return false;
};
function convertArrayToString(filters) {
    let string = "";
    filters.map(element => {
        string += element + ' ';
    });
    return string;
};

const getProductsByFilter = async (filters) => {
    const result = await ProductModel.find({status: ProductStatus.UNACTIVE}).select(filters)
    return result;
};


const blockProduct = async (_id) => {
    const result = await ProductModel.updateOne({
        _id,
        status: ProductStatus.ACTIVE
    },
        { status: ProductStatus.UNACTIVE });
    if (result.n === result.nModified) return true;
    return false;
};

export default {
    createProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    convertArrayToString,
    getProductsByFilter,
    blockProduct
};
