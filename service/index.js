const Contacts = require('./schemas/contact');
const Users = require('./schemas/users');

const getAllContacts = async ({ owner, skip, limit, favorite }) => {
  return Contacts.find(favorite ? { owner, favorite } : { owner }, '-createdAt -updatedAt')
    .populate('owner', 'email subscription -_id')
    .skip(skip)
    .limit(limit);
};
const getByIdContact = async ({ id, owner }) => {
  return Contacts.findOne({ _id: id, owner });
};
const createContact = async ({ body, owner }) => {
  return Contacts.create({ ...body, owner });
};
const removeContact = async ({ id, owner }) => {
  return Contacts.findOneAndRemove({ _id: id, owner });
};
const updateContact = async ({ id, body, owner }) => {
  return Contacts.findOneAndUpdate({ _id: id, owner }, body, { new: true });
};
const updateStatusContact = async ({ id, body, owner }) => {
  return Contacts.findByIdAndUpdate({ _id: id, owner }, body, { new: true });
};

/* ===========================USERS============== */
const validateEmail = async email => {
  const user = await Users.findOne({ email });
  return user;
};
const createUser = async ({ email, password, verificationToken }) => {
  const result = await Users.create({ email, password, verificationToken });
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
const updateSubscription = async ({ id, subscription }) => {
  const result = await Users.findByIdAndUpdate(id, { subscription }, { new: true });
  return result;
};
const findVerificationToken = async ({ verificationToken }) => {
  const result = await Users.findOne({ verificationToken });
  return result;
};
const findUserIDandUpdateVerify = async ({ id, verificationToken = null, verify = true }) => {
  const result = await Users.findByIdAndUpdate(id, { verificationToken, verify }, { new: true });
  return result;
};
const updateAvatar = async ({ id, avatarURL }) => {
  const result = await Users.findByIdAndUpdate(id, { avatarURL }, { new: true });
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
  updateSubscription,
  updateAvatar,
  findVerificationToken,
  findUserIDandUpdateVerify,
};
