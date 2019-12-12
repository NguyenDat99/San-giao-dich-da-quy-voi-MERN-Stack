import mongoose, {
    Schema, Mongoose
} from 'mongoose';
import {
    ProductStatus
} from '../commons/product.status';


const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: ProductStatus.ACTIVE,
    },
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Account',
    // },
    // ,
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }
    // ,
    // maxSizeOfProperties:{
    //   type: Number,
    //   default: 5
    // }
    ,
    properties: {}
}, {
    versionKey: false,
    timestamps: true,
});

export default mongoose.model('Product', ProductSchema);
