const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, index: true },
  mobile: { type: String, index: true },
  passwordHash: String,
  businessName: String,
  gstin: String,
  pan: String,
  bank: {
    accountNumber: String,
    ifsc: String,
    holderName: String,
  },
  role: { type: String, enum: ['supplier','admin'], default: 'supplier' },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);
