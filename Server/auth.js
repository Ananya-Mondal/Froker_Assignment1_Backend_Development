const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  
  //const token =req.header('x-auth-token')
  const secret_key =process.env.JWT_Token_Key
  if (token) {
    //To get only token value 
    const token1=token.split(" ")[1]
    jwt.verify(token1, secret_key, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: err });
      } else {
        req.userId = decodedToken.userId;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = requireAuth;