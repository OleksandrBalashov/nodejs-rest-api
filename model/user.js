const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(
        this.email,
        {
          s: 250,
          d: 'https://www.edmundsgovtech.com/wp-content/uploads/2020/01/default-picture_0_0.png',
        },
        true
      );
    },
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
    default: () => nanoid(),
  },
});

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;
