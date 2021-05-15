const Joi = require('joi');

const validateForm = (req, res, next) => {
  const isValidContact = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });

  const validContact = isValidContact.validate(req.body);

  if (validContact.error) {
    return res.status(400).json(validContact.error);
  }

  next();
};

const validateUpdate = (req, res, next) => {
  const isValidContact = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
  });

  const validContact = isValidContact.validate(req.body);

  if (validContact.error) {
    return res.status(400).json(validContact.error);
  }

  next();
};

module.exports = { validateForm, validateUpdate };
