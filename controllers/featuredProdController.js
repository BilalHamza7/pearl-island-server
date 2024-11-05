import { FeaturedProd } from '../models/featuredProdModel.js';

// get all featured products

// an array of ids are received and saved which can be retreived as a whole array

export const saveFeaturedProds = async (req, res) => {
    const featuredId = [...req.body];

    const newProducts = new FeaturedProd({ productid: featuredId });

    const products = await newProducts.save();

    if (products.length !== 0) {
        return res.status(200).json({ products });
    } else {
        return res.status(404).json({ message: 'Could Not Save Featured Products!' });
    }

};

export const getFeaturedProds = async (req, res) => {
    try {
        const products = await FeaturedProd.find().select('productId');

        if (products.length !== 0) {
            return res.status(200).json({ products });
        } else {
            return res.status(404).json({ message: 'Could Not Find Featured Products!' });
        }
    } catch (err) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};
