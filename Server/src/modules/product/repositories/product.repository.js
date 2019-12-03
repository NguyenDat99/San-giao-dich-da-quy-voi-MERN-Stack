import ProductModel from '../models/product.models';
import { ProductStatus } from '../commons/product.status';

const createProduct = async (data) => {
    const result = await ProductModel.create(data);
    return result;
};

const getProduct = async (_id) => {
    var result = await ProductModel.findOne({ _id, status: ProductStatus.ACTIVE });
    return result;
};
const getAllProducts = async () => {
    var result = await ProductModel.find({ status: ProductStatus.ACTIVE }).where('_id');
    result.forEach(forEachFunc)
    function forEachFunc(item, index) {
      //for (const element of item.properties)
      if( item.properties!= undefined)
      Object.keys(item.properties).forEach(key => {
        if(item.properties[key].status== "UNACTIVE")
            delete  item.properties[key]
})
    }
    var s=[]
    var id=[]
    for(var i=0;i<result.length;i++){
      var s1=[{productID:result[i]._id,productName: result[i].productName,
        total: result[i].total
        ,properties:result[i].properties}]
      s.push(s1)
    }
    console.log(result);
    return s
    // return result;
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
