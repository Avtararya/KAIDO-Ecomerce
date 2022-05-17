import User from '../modals/User.js';

//UPDATE
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const user = await User.findOneAndUpdate({ id }, body, {
      returnOriginal: false,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(403).json(err);
  }
};

//DELETE
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.send('User Deleted');
  } catch (err) {
    res.status(403).json(err);
  }
};

//GET
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get ALL
export const getUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().limit(2).sort({ _id: -1 })
      : await User.find().sort({ _id: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET USER STATS
export const getStats = async (req, res) => {
  const currentDate = new Date();
  const lastYear = new Date(
    currentDate.setFullYear(currentDate.getFullYear() - 1)
  );
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gt: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
