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
    properties: {}
}, {
    versionKey: false,
    timestamps: true,
});

export default mongoose.model('Product', ProductSchema);
