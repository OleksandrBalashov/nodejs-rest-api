const { User } = require('../model');

const findUser = (filter) => {
  return User.findOne(filter);
};

const addUser = ({ email, password }) => {
  const newUser = new User({ email });
  newUser.setPassword(password);

  return newUser.save();
};

const findByIdAndUpdate = (id, update) => {
  return User.findByIdAndUpdate(id, update, { new: true });
};

module.exports = {
  findUser,
  addUser,
  findByIdAndUpdate,
};
