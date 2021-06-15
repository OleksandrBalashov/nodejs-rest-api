const { User } = require('../model');

const findUser = (filter) => {
  return User.findOne(filter);
};

const addUser = ({ email, password, avatarURL }) => {
  const newUser = new User({ email, avatarURL });
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
