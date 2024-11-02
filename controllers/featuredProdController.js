import { FeaturedProd } from '../models/featuredProdModel.js';

// get all featured products

// an array of ids are received and saved which can be retreived as a whole array

export const saveFeaturedProd = async (req, res) => {
    const featuredId = [...req.body];

    const products = await FeaturedProd.save({ productid: featuredId });

    if (!products) res.status(404).json({ message: 'Could Not Save Featured Products!' });

    res.status(200).json({ products });
};

export const getFeaturedProd = async (req, res) => {
    try {
        const products = await FeaturedProd.find().select('productId');

        if (products.length === 0) res.status(404).json({ message: 'No Featured Products Available' });

        res.status(200).json({ products });
    } catch (err) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
};
