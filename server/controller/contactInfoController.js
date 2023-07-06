import contactInfoModel from "../models/contactInfoModel.js";

export const sendInfo = async (req, res) => {
  const {
    FirstName,
    LastName,
    WhatCanWeDoForYou,
    Email,
    PhoneNo,
    Message,
  } = req.body;

  const info = new contactInfoModel({
    FirstName,
    LastName,
    WhatCanWeDoForYou,
    Email,
    PhoneNo,
    Message,
  });

  try {
    await info.save();
    res.status(200).json("Created successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const getInfos = async (req, res) => {
  const info = await contactInfoModel.find({});
  try {
    res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const getInfo= async(req,res)=>{
  const {id}=req.params;
  const info=await contactInfoModel.findById({_id:id});
  try {
    res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}