import Product from '../modals/Product.js';

//CREATE
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE
export const updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(product);
  } catch (err) {
    res.status(403).json(err);
  }
};

//DELETE
export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndDelete(id);
    res.send('Product Deleted');
  } catch (err) {
    res.status(403).json(err);
  }
};

//GET
export const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get ALL
export const getProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};
