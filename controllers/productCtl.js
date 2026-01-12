const productSchema = require('../model/productSchema')
const fs = require('fs');

// Add Product
module.exports.AddProduct = async (req, res) => {
    try {
        const { productName, manufactureName, price, description, category, stock } = req.body;

        if (!req.file) {
            return res.json({ message: 'Image is required' });
        }

        const newProduct = new productSchema({
            productName,
            manufactureName,
            price,
            description,
            category,
            stock,
            image: req.file.path
        });

        await newProduct.save();
        res.status(200).json({ message: 'Product added successfully', newProduct });
    }
    catch (error) {
        console.log(error)
    }
}

// Get Product
module.exports.GetProduct = async (req, res) => {
    try {
        const products = await productSchema.find();
        res.status(200).json({ products });
    }
    catch (error) {
        console.log(error);
    }
}

// Delete Product
module.exports.DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productSchema.findById(id);

        fs.unlink(product.image, async (error) => {
            if (error) {
                console.error("Error deleting image file:", error);
                return res.status(500).json({ message: 'Error deleting image file' });
            }
            await productSchema.findByIdAndDelete(id);
            res.status(200).json({ message: 'Product deleted successfully' });
        });
    }
    catch (error) {
        console.log(error);
    }
}

// Get Product By Id For Single Page
module.exports.GetProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productSchema.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ product });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Update Product
module.exports.UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, manufactureName, price, description, category, stock } = req.body;

        const existingProduct = await productSchema.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let updateData = {
            productName,
            manufactureName,
            price,
            description,
            category,
            stock
        };

        if (req.file) {
            if (existingProduct.image) {
                fs.unlink(existingProduct.image, (error) => {
                    if (error) {
                        console.error("Error deleting old image file:", error);
                    }
                });
            }
            updateData.image = req.file.path;
        }

        const updatedProduct = await productSchema.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}