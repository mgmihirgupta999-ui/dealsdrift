const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// list supplier orders
router.get('/', auth, async (req,res)=>{
  const orders = await Order.find({supplier: req.user.id}).sort({createdAt:-1}).limit(50);
  res.json({orders});
});

// update order status
router.post('/:id/status', auth, async (req,res)=>{
  const {status, tracking} = req.body;
  const o = await Order.findById(req.params.id);
  if(!o) return res.status(404).send('Not found');
  o.status = status;
  if(tracking) o.tracking = tracking;
  await o.save();
  res.json(o);
});

module.exports = router;
