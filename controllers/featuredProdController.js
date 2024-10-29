import FeaturedProdModel from '../models/featuredProdModel';

export const getFeaturedProd = async (req, res) => {
    try {
        const products = FeaturedProdModel.find();

        if(!products) res.status(404).json({ message: 'No Featured Products Available'});

        res.status(200).json({ products });
    } catch (err) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error!'})
    }
}