const Joi = require('joi');

const validateForm = (req, _, next) => {
  const { body } = req;

  const isValidContact = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validContact = isValidContact.validate(body);

  if (validContact.error) {
    validContact.error.code = 400;
    return next(validContact.error);
  }

  next();
};

module.exports = { validateForm };
