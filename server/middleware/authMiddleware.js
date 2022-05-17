import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authToken = req.headers.token;
  const token = authToken.split(' ')[1];
  if (authToken) {
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        res.status(403).send('Token is not valid');
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).send('Your are not Authenticated');
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send('You are not Authenticated');
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send('You are not Authenticated');
    }
  });
};
