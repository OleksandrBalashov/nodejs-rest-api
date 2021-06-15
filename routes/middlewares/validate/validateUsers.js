const Joi = require('joi');

const validateForm = (req, _, next) => {
  const { body } = req;

  const isValidUser = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    subscription: Joi.string(),
    token: Joi.string(),
    owner: Joi.string(),
    avatarURL: Joi.string(),
    verify: Joi.boolean(),
    verifyToken: Joi.string(),
  });

  const validUser = isValidUser.validate(body);

  if (validUser.error) {
    validUser.error.code = 400;
    return next(validUser.error);
  }

  next();
};

const validateFieldSubscr = (req, _, next) => {
  const { body } = req;

  const isValidField = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business').required(),
  });

  const validField = isValidField.validate(body);

  if (validField.error) {
    validField.error.code = 400;
    return next(validField.error);
  }

  next();
};

module.exports = {
  validateForm,
  validateFieldSubscr,
};
