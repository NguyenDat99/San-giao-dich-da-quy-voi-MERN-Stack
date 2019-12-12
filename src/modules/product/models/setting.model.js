import mongoose, {
    Schema, Mongoose
} from 'mongoose';


const SettingSchema = new Schema({
    properties: {}
}, {
    versionKey: false,
    timestamps: true,
});

export default mongoose.model('Setting', SettingSchema);
