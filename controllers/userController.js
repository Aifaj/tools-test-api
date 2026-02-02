const userModel = require('../models/user');

exports.getAllUser = async (req, res) => {
  try{
    const user = await userModel.findAll();
    res.status(200).json({data: user, message: "Get all user success"}); 
  }catch(err){
    res.status(500).json({message: err.message});
  }
}