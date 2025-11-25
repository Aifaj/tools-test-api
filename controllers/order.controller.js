const Order = require('../models/Order');

exports.create = async (req, res) => {
  try {
    const o = await Order.create(req.body);
    res.send(o);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const o = await Order.findById(req.params.id);
    res.send(o);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const o = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(o);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.send({ message: "Order deleted" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { userId } = req.query;

    let filter = {
      userId : userId
    };

    // if (userId) {
    //   filter.userId = userId;
    // }

    const list = await Order.find(filter);
    res.send(list);

  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
