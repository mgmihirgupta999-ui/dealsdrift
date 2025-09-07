const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/payout', auth, async (req,res)=>{
  const {amount, account} = req.body;
  // In production: call Razorpay or other payouts API
  res.json({ok:true, payoutId: 'payout_demo_123', amount});
});

router.get('/reports', auth, async (req,res)=>{
  res.json({items: []});
});

module.exports = router;
