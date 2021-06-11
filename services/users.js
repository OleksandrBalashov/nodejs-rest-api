const User = require('../model');

const findUser = (email) => {
  return User.findOne(email);
};

const addUser = ({ email, password }) => {
  const newUser = new User({ email });
  newUser.setPassword(password);

  return newUser.create({ email, password });
};

module.exports = {
  findUser,
  addUser,
};
