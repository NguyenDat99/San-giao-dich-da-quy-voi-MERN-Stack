import mongoose, {
    Schema, Mongoose
} from 'mongoose';

const CartSchema = new Schema({
  productID: {
      type: String,
      required: true,
  },
    productName: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true
    },
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Account',
    // },
    email: {
        type: String,
        required: true,
    },
    properties: {}
}, {
    versionKey: false,
    timestamps: true
});

export default mongoose.model('Cart', CartSchema);
