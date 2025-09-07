const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  price: Number,
  status: { type: String, enum: ['new','in_progress','shipped','delivered','returned'], default: 'new' },
  tracking: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', OrderSchema);
