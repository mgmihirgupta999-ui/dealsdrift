const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// create product
router.post('/', auth, async (req,res)=>{
  const body = req.body;
  body.supplier = req.user.id;
  const p = await Product.create(body);
  res.json(p);
});

// list supplier products
router.get('/', auth, async (req,res)=>{
  const {page=1, limit=20, status} = req.query;
  const filter = { supplier: req.user.id };
  if(status) filter.status = status;
  const items = await Product.find(filter).skip((page-1)*limit).limit(parseInt(limit));
  res.json({items});
});

module.exports = router;
