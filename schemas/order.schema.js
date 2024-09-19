const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productIds: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
    totalAmount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
