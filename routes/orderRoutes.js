const express = require('express');
const router = express.Router();
const Order = require('../schemas/order.schema');

router.post('/', async (req, res) => {
    const { userId, productIds, totalAmount } = req.body;

    if (!userId || !productIds || totalAmount === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newOrder = new Order({ userId, productIds, totalAmount });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { userId, productIds, totalAmount } = req.body;

    if (!userId || !productIds || totalAmount === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { userId, productIds, totalAmount }, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
