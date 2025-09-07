const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register (simple)
router.post('/register', async (req,res)=>{
  const {email,mobile,password,name,businessName} = req.body;
  if(!password || (!email && !mobile)) return res.status(400).json({error:'Missing fields'});
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({email,mobile,passwordHash:hash,name,businessName});
  res.json({ok:true, userId: user._id});
});

// Login
router.post('/login', async (req,res)=>{
  const {emailOrMobile,password} = req.body;
  const user = await User.findOne({$or:[{email:emailOrMobile},{mobile:emailOrMobile}]});
  if(!user) return res.status(401).json({error:'Invalid credentials'});
  const match = await bcrypt.compare(password, user.passwordHash);
  if(!match) return res.status(401).json({error: 'Invalid credentials'});
  const token = jwt.sign({sub:user._id,role:user.role}, process.env.JWT_SECRET || 'secret', {expiresIn:'1d'});
  res.json({token, user:{id:user._id, name:user.name, verified:user.verified}});
});

module.exports = router;
