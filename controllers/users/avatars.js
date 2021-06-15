const path = require('path');
const fs = require('fs').promises;
const Jimp = require('jimp');
const { users: services } = require('../../services');

const avatars = async (req, res, next) => {
  const { path: tempName, originalname } = req.file;
  const { _id } = req.user;

  try {
    const image = await Jimp.read(tempName);

    const now = new Date();
    const filePart = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDay()}-${now.getHours()}`;

    const [name] = originalname.split('.');

    const newName = `${name}_${filePart}.${image.getExtension()}`;

    const uploadDir = path.join(__dirname, '../../public', 'avatars', newName);

    image
      .resize(250, 250)
      .quality(100)
      .write(uploadDir, () => fs.unlink(tempName));

    const { avatarURL } = await services.findByIdAndUpdate(_id, {
      avatarURL: uploadDir,
    });

    res.json({
      status: 'success',
      code: 200,
      data: {
        user: {
          avatarURL,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message,
    });
  }
};

module.exports = avatars;
