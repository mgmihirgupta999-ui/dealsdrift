const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  price: Number,
  mrp: Number,
  stock: Number,
  images: [String],
  category: String,
  tags: [String],
  status: { type: String, enum: ['draft','pending','approved','rejected'], default: 'draft'},
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Product', ProductSchema);
