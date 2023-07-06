import mongoose from "mongoose";

const contactInfoSchema = mongoose.Schema({
  FirstName: {
    type: String,
    required: [true, "Please add a FirstName"],
  },
  LastName: {
    type: String,
    required: [true, "Please add a LastName"],
  },
  WhatCanWeDoForYou: {
    type: "String",
    enum: ["Option1", "Option2", "Option3", "Option4"],
    required: [true, "What can we do for you?"],
  },
  Email: {
    type: String,
    required: [true, "Please add an email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  PhoneNo: {
    type: Number,
    required: [true, "Please add a phone number"],
  },
  Message: {
    type: String,
    required: [true, "Please add a message"],
  },
});

const contactInfoModel = mongoose.model("contactInfo", contactInfoSchema);
export default contactInfoModel;
