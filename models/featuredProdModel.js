import mongoose from 'mongoose';

const featuredProdSchema = mongoose.Schema({
    featuredId: { type: String, required: true },
    productId: { type: String, required: true }
});

export const FeaturedProd = mongoose.model('FeaturedProd', featuredProdSchema);