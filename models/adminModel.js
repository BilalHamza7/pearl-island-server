import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
    adminId: { type: String, required: true },
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    mobileNumber: { type: Number, required: false },
    email: { type: String, required: false },
});

export const Admin = mongoose.model('Admin', adminSchema);