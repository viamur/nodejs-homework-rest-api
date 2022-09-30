const Contacts = require('./schemas/contact');
const Users = require('./schemas/users');

const getAllContacts = async ({ owner }) => {
  return Contacts.find({ owner }).populate('owner', 'email');
};
const getByIdContact = async id => {
  return Contacts.findOne({ _id: id });
};
const createContact = async body => {
  return Contacts.create({ ...body });
};
const removeContact = async id => {
  return Contacts.findByIdAndRemove({ _id: id });
};
const updateContact = async (id, body) => {
  return Contacts.findByIdAndUpdate({ _id: id }, body);
};
const updateStatusContact = async (id, body) => {
  return Contacts.findByIdAndUpdate({ _id: id }, body);
};

/* ===========================USERS============== */
const validateEmail = async email => {
  const user = await Users.findOne({ email });
  return user;
};
const createUser = async ({ email, password }) => {
  const result = await Users.create({ email, password });
  return result;
};
const updateUserToken = async ({ id, token }) => {
  const result = await Users.findByIdAndUpdate(id, { token: token }, { new: true });
  return result;
};
const findByIdUser = async ({ id }) => {
  const result = await Users.findById(id);
  return result;
};
module.exports = {
  getAllContacts,
  getByIdContact,
  createContact,
  removeContact,
  updateContact,
  updateStatusContact,
  validateEmail,
  createUser,
  updateUserToken,
  findByIdUser,
};
