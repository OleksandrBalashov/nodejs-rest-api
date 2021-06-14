const { Contact } = require('../model');

const getAll = ({ page, limit, favorite }) => {
  const options = page && limit ? { page, limit } : { pagination: false };
  const obj = favorite ? { favorite } : {};
  return Contact.paginate(obj, options);
};

const add = (body) => {
  return Contact.create({ ...body });
};

const findById = (id) => {
  return Contact.findById(id);
};

const update = (id, body, options) => {
  return Contact.findByIdAndUpdate(id, body, options);
};

const remove = (id) => {
  return Contact.findByIdAndRemove(id);
};

module.exports = {
  getAll,
  add,
  findById,
  update,
  remove,
};
