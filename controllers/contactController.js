const asyncHandler = require("express-async-handler");
const Contacts = require("../models/contactModels");
const { Error } = require("mongoose");

//@description Get all contact
//@route Get /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contacts.find({ user_id: req.user.id });
  res.status(200).json(contact);
});

//@description Get all contact
//@route Get /api/contacts
//@access private

const creatContact = asyncHandler(async (req, res) => {
  console.log("Creat contact", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all fields are mendetory");
  }
  const contact = await Contacts.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(200).json(contact);
});

//@description Get contact
//@route Get /api/contacts
//@access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json(contact);
});

//@description Update contact
//@route Update /api/contacts
//@access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  if (contact.user_id.toString() != req.user.id) {
    res.status(401);
    throw new Error("Unauthorised Service");
  }

  const updatedContact = await Contacts.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedContact);
});

//@description Delete contact
//@route Delete /api/contacts
//@access private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  if (contact.user_id.toString() != req.user.id) {
    res.status(401);
    throw new Error("Unauthorised Service");
  }

  await Contacts.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Contact deleted", contact });
});

module.exports = {
  getContacts,
  creatContact,
  getContact,
  updateContact,
  deleteContact,
};
