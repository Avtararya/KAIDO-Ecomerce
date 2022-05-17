import User from '../modals/User.js';
import jwt from 'jsonwebtoken';

const createToken = (id, isAdmin) => {
  const token = jwt.sign({ id, isAdmin }, process.env.JWT_KEY, {
    expiresIn: '3d',
  });
  return token;
};

export const postSignUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = createToken(user._id, user.isAdmin);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).send('Email and Password not found');
  }
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    if (user) {
      const token = createToken(user._id, user.isAdmin);
      res.json({ user, token });
    } else {
      res.send('Incorrect email or password');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
