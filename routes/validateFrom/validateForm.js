const Joi = require('joi');

const validateForm = async (req, res, next) => {
  try {
    const createUserRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });

    const validContact = await Joi.validate(req.body, createUserRules);

    if (validContact.error) {
      return res.status(400).json({ message: 'missing required name field' });
    }
  } catch (err) {}

  next();
};

module.exports = { validateForm };
