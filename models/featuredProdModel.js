import mongoose from 'mongoose';

const featuredProdSchema = mongoose.Schema({
    productId: { type: [String], required: true }
});

export const FeaturedProd = mongoose.model('FeaturedProd', featuredProdSchema);