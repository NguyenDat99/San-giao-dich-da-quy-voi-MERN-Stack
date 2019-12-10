import ProductModel from '../models/product.models';
import {
  ProductStatus
} from '../commons/product.status';

const createProduct = async (data) => {
  var maxSizeOfProperties = 5
  if (data.maxSizeOfProperties != undefined)
    maxSizeOfProperties = data.maxSizeOfProperties
  var keyCount = 0
  Object.keys(data.properties).forEach(key => {
    if (data.properties[key].status == "ACTIVE")
      keyCount += 1
  })
  if (keyCount > maxSizeOfProperties) return NaN
  const result = await ProductModel.create(data);
  return result;
};

const getProduct = async (_id, setting) => {
  var result = await ProductModel.findOne({
    _id,
    status: ProductStatus.ACTIVE
  });
  //xu ly setting
  if (setting != undefined) {
    var tmp = setting.split(",")
    console.log(tmp);
    Object.keys(result.properties).forEach(key => {
      var co = 0
      for (var i = 0; i < tmp.length; i++)
        if (tmp[i] == key) {
          co = 1;
          break;
        }
      if (co == 0) {
        delete result.properties[key]
      }
    })
  }
  return result;
};
const getAllProducts = async (page, limit, setting) => {
  //chuyen thanh mang tu setting
  var tmp = {}
  if (setting != undefined)
    tmp = setting.split(",")
  // lay du lieu
  var result = await ProductModel
    .find({
      status: ProductStatus.ACTIVE
    })
    .where('_id')
    .limit(limit)
    .skip(limit * page);

  //forEach
  result.forEach(forEachFunc)

  function forEachFunc(item, index) {
    if (item.properties != undefined)
      //xu ly trong properties
      Object.keys(item.properties).forEach(key => {
        if (setting != undefined) {
          var co = 0
          for (var i = 0; i < tmp.length; i++)
            if (tmp[i] == key) {
              co = 1;
              break;
            }
          if (co == 0) {
            delete item.properties[key]
          }
        }
      })
  }
  return result;
};


const getAllProductInputByCategoryId = async (page, limit, CategoryId) => {
  var result = await ProductModel
    .find({
      status: ProductStatus.ACTIVE,
      CategoryId: CategoryId
    })
    .where('_id')
    .limit(limit)
    .skip(limit * page);
  return result;
};


const updateProduct = async (_id, data) => {
  var newData = (await ProductModel
    .findOne({
      _id,
      status: ProductStatus.ACTIVE
    }))
  var newAtt = []
  if (data.properties != undefined) {
    Object.keys(data.properties).forEach(dataKey => {
      var co = 0
      if (newData.properties != undefined)
        Object.keys(newData.properties).forEach(newDataKey => {
          if (dataKey == newDataKey) {
            newData.properties[newDataKey] = data.properties[dataKey]
            co = 1
          }
        })
      if (co == 0) {
        newAtt.push([dataKey, data.properties[dataKey]])
      }
    })
  }

  if (newAtt.length > 0 && newData.properties != undefined) {
    newAtt.forEach(function a(item, index) {
      newData.properties[item[0].toString()] = item[1]
    })
  }

  if (data.properties != undefined && newData.properties != undefined)
    data.properties = newData.properties

  //xu ly maxSizeOfProperties
  var maxSizeOfProperties = (await ProductModel
      .findOne({
        _id,
        status: ProductStatus.ACTIVE
      }))
    .maxSizeOfProperties;
  if (data.maxSizeOfProperties != undefined) {
    maxSizeOfProperties = data.maxSizeOfProperties
  }
  var keyCount = 0
  if (data.properties != undefined)
    Object.keys(data.properties).forEach(key => {
      if (data.properties[key].status == "ACTIVE")
        keyCount += 1
    })
  if (keyCount > maxSizeOfProperties) return NaN

  const result = await ProductModel.updateOne({
    _id,
    status: ProductStatus.ACTIVE
  }, {
    ...data
  });
  //cap nhat lai maxSizeOfProperties cho toan bo
  var dt = await ProductModel
    .find()
  dt.forEach(forEachFunc)

  function forEachFunc(item, index) {
    if (item.maxSizeOfProperties != undefined)
      item.maxSizeOfProperties = maxSizeOfProperties
    item.save
  }
  //kiem tra cap nhat
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
  const result = await ProductModel.find({
    status: ProductStatus.UNACTIVE
  }).select(filters)
  return result;
};


const blockProduct = async (_id) => {
  const result = await ProductModel.updateOne({
    _id,
    status: ProductStatus.ACTIVE
  }, {
    status: ProductStatus.UNACTIVE
  });
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
