import mongoose from 'mongoose';

const requestSchema = mongoose.Schema({
    requestId: { type: String, required: true },
    gemstoneId: { type: [String], required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    message: { type: String, required: true },
    companyName: { type: String, required: true },
    date: { type: Date, required: true },
    responded: { type: Boolean, required: true },
});

export const Request = mongoose.model('Request', requestSchema);