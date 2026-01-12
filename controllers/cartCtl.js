const Cart = require('../model/cartSchema');

// Add to Cart
module.exports.AddToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [{ product: productId, quantity }]
            });

            await cart.save();
            return res.status(200).json({
                message: 'Product added to cart',
                cart
            });
        }

        const alreadyInCart = cart.items.find(
            item => item.product.toString() === productId
        );

        if (alreadyInCart) {
            return res.status(409).json({
                message: 'Product already in cart'
            });
        }

        cart.items.push({ product: productId, quantity });
        await cart.save();

        res.status(200).json({
            message: 'Product added to cart',
            cart
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Cart
module.exports.GetCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart) {
            return res.status(200).json({ items: [] });
        }

        res.status(200).json({ items: cart.items });
    }
    catch (error) {
        console.error('Get cart error:', error);
    }
}

// Update Cart
module.exports.UpdateCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const cart = await Cart.findOne({ user: userId });

        const item = cart.items.find(
            item => item.product.toString() === productId
        );

        item.quantity = quantity;

        await cart.save();

        res.status(200).json({ message: 'Cart updated successfully' });
    }
    catch (error) {
        console.error('Update cart error:', error);
    }
}

// Delete Cart
module.exports.DeleteCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const { userId } = req.body;

        const cart = await Cart.findOne({ user: userId });

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        res.status(200).json({ message: 'Product removed from cart' });
    }
    catch (error) {
        console.error('Delete product from cart error:', error);
    }
}