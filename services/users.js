const { User } = require('../model');

const findUser = (filter) => {
  return User.findOne(filter);
};

const addUser = ({ email, password }) => {
  const newUser = new User({ email });
  newUser.setPassword(password);

  return newUser.save();
};

module.exports = {
  findUser,
  addUser,
};
