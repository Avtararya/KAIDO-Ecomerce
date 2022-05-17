import Order from '../modals/Order.js';

//CREATE
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE
export const updateOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(order);
  } catch (err) {
    res.status(403).json(err);
  }
};

//DELETE
export const deleteOrder = async (req, res) => {
  const id = req.params.id;
  try {
    await Order.findByIdAndDelete(id);
    res.send('Order Deleted');
  } catch (err) {
    res.status(403).json(err);
  }
};

//GET USER ORDERS
export const getOrders = async (req, res) => {
  const userId = req.params.userId;
  try {
    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL CARTS
export const getAllOrders = async (req, res) => {
  try {
    const orders = Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET MONTHLY INCOME
export const getMonthlyIncome = async (req, res) => {
  const currentDate = new Date();
  const lastMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      {
        $match: { createdAt: { $gt: previousMonth } },
      },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};
