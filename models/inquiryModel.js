import mongoose from 'mongoose';

const inquirySchema = mongoose.Schema({
    inquiryId: { type: String, required: true },
    fullName: { type: String, required: true },
    subject: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    message: { type: String, required: true },
    companyName: { type: String, required: true },
    date: { type: Date, required: true },
    responded: { type: Boolean, required: true },
});

export const Inquiry = mongoose.model('Inquiry', inquirySchema);