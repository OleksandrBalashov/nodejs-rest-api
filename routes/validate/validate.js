const Joi = require('joi');

const validateForm = (req, _, next) => {
  const isValidContact = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().default(false),
  });

  const validContact = isValidContact.validate(req.body);

  if (validContact.error) {
    validContact.error.code = 400;
    return next(validContact.error);
  }

  next();
};

const validateUpdate = (req, _, next) => {
  const isValidContact = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
  });

  const validContact = isValidContact.validate(req.body);

  if (validContact.error) {
    validContact.error.code = 400;
    return next(validContact.error);
  }

  next();
};

module.exports = { validateForm, validateUpdate };
