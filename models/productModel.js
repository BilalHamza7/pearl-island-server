import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    kind: { type: String, required: true },
    weight: { type: Number, required: true },
    colour: { type: String, required: true },
    section: { type: String, required: true },
    size: { type: String, required: true },
    cut: { type: String, required: true },
    origin: { type: String, required: true },
    shape: { type: String, required: true },
    treatment: { type: String, required: true },
    clarity: { type: String, required: true },
    certificate: { type: String, required: false },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    dateListed: { type: Date, required: true },
    soldStatus: { type: Boolean, required: false },
});

export const Product = mongoose.model('Product', productSchema);