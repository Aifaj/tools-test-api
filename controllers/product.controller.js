const Product = require('../models/Product');

exports.create = async (req, res) => {
  const p = await Product.create(req.body);
  res.send(p);
}

exports.getAll = async (req, res) => {
  const p = await Product.find();
  res.send(p);
}

exports.update = async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(p);
}

exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send({ message: "Deleted" });
}
