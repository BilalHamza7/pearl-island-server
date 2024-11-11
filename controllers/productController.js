import { Product } from '../models/productModel.js';
import { getNextSequenceValue } from './idCounterController.js';
import { dateFilter } from './dateFilter.js';

export const saveProduct = async (req, res) => {
    const { name, kind, weight, colour, section, size, cut, origin, shape, treatment, clarity, certificate, summary, description, images, soldStatus } = req.body;
    const date = new Date();

    try {
        let productId = await getNextSequenceValue('product');
        const id = 'PROD-' + productId;
        const newProduct = new Product({ productId: id, name: name, kind: kind, weight: weight, colour: colour, section: section, size: size, cut: cut, origin: origin, shape: shape, treatment: treatment, clarity: clarity, certificate: certificate, summary: summary, description: description, images: images, dateListed: date, soldStatus: soldStatus });

        const product = await newProduct.save();
        if (product) {
            return res.status(200).json(product.productId);
        } else {
            return res.status(404).json({ message: 'Could Not Save Product, Please Try Again!' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error!', error });
    }
}

const weightFilter = async (weight) => {
    const filteredWeight = {};

    try {
        switch (weight) {
            case 'less-than-1':
                filteredWeight.weight = { $lt: 1 };
                break;
            case '1-2':
                filteredWeight.weight = { $gte: 1, $lt: 2 };
                break;
            case '2-4':
                filteredWeight.weight = { $gte: 2, $lt: 4 };
                break;
            case '4-8':
                filteredWeight.weight = { $gte: 4, $lt: 8 };
                break;
            case 'greater-than-8':
                filteredWeight.weight = { $gte: 8 };
                break;
            default:
                break;
        }
        return filteredWeight;
    } catch (error) {
        console.error(error);
        return 'Could Not Filter Weight';
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ dateListed: -1 });

        if (products.length !== 0) {
            return res.status(200).json({ products });
        } else {
            return res.status(404).json({ message: 'Could Not Find Any Products!' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error!', error });
    }
}

export const getKindCount = async (req, res) => {
    try {
        const products = await Product.aggregate([
            { $group: { _id: "$kind", count: { $sum: 1 } } },
            { $project: { kind: "$_id", count: 1, _id: 0 } }
        ]);

        if (products.length > 0) {
            return res.status(200).json({ products });
        } else {
            return res.status(404).json({ message: 'Could Not Find Any Products!' });
        }
    } catch (error) {
        console.error('Error in getKindCount:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getLatestProducts = async (req, res) => {
    try {
        const products = await Product.find().select('name weight shape dateListed').limit(5);
        console.log(products);

        if (products.length > 0) {
            return res.status(200).json({ products });
        } else {
            return res.status(404).json({ message: 'Could Not Find Any Products!' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error!', error });
    }
};

export const getProductById = async (req, res) => {
    const gemstoneId = req.query.gemstoneId;
    try {
        const product = await Product.find({ productId: gemstoneId });
        if (product) {
            return res.status(200).json({ product });
        } else {
            return res.status(404).json({ message: 'Could Not Find A Product!' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error!', error });
    }
}