const jwt = require('jsonwebtoken');
module.exports = function(req,res,next){
  const h = req.headers.authorization;
  if(!h) return res.status(401).json({error:'Missing token'});
  const parts = h.split(' ');
  if(parts.length !== 2) return res.status(401).json({error:'Invalid token'});
  const token = parts[1];
  try{
    const p = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = { id: p.sub, role: p.role };
    next();
  }catch(e){
    return res.status(401).json({error:'Invalid token'});
  }
};
