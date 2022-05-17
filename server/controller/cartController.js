import Cart from '../modals/Cart.js';

//CREATE
export const createCart = async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE
export const updateCart = async (req, res) => {
  const id = req.params.id;
  try {
    const cart = await Cart.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(cart);
  } catch (err) {
    res.status(403).json(err);
  }
};

//DELETE
export const deleteCart = async (req, res) => {
  const id = req.params.id;
  try {
    await Cart.findByIdAndDelete(id);
    res.send('Cart Deleted');
  } catch (err) {
    res.status(403).json(err);
  }
};

//GET USER CART
export const getCart = async (req, res) => {
  const userId = req.params.userId;
  try {
    const cart = await Cart.findOne({ userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL CARTS

export const getAllCarts = async (req, res) => {
  try {
    const carts = Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};
