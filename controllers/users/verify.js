const { users: services } = require('../../services');
const sgMail = require('@sendgrid/mail');
const { createMail } = require('../../utils');

const verify = async (req, res, next) => {
  const { body } = req;

  try {
    const user = await services.findUser(body);
    console.log(user);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
    }

    const { verify, email, verifyToken } = user;

    if (verify) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Verification has already been passed',
      });
    }

    const mail = createMail(email, verifyToken);

    sgMail
      .send(mail)
      .then(() => console.log('email send'))
      .catch(error => console.log(error.message));

    res.json({
      status: 'success',
      code: 200,
      message: 'Verification email sent',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
