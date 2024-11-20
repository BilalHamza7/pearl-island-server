import { FeaturedProd } from '../models/featuredProdModel.js';

// get all featured products

// an array of ids are received and saved which can be retreived as a whole array

export const saveFeaturedProds = async (req, res) => {
    const featuredId = req.body;

    const existingProducts = await FeaturedProd.find();

    if (existingProducts.length > 0) {
        const updatedProducts = await FeaturedProd.findOneAndUpdate(
            {},
            { productId: featuredId },
            { new: true }
        );

        if (updatedProducts) {
            return res.status(200).json({ products: updatedProducts });
        } else {
            return res.status(404).json({ message: 'Could Not Save Featured Products!' });
        }
    } else {
        const newProducts = new FeaturedProd({ productId: featuredId });
        const savedProducts = await newProducts.save();

        if (savedProducts) {
            return res.status(200).json({ products: savedProducts });
        } else {
            return res.status(404).json({ message: 'Could Not Save Featured Products!' });
        }
    }
};

export const getFeaturedProds = async (req, res) => {
    try {
        const products = await FeaturedProd.find();
        
        if (products.length !== 0) {
            const ids = products[0].productId;
            return res.status(200).json({ products: ids });
        } else {
            return res.status(404).json({ message: 'Could Not Find Featured Products!' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};
