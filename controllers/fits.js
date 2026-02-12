const Fit = require("../models/Fit");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllFits = async (req, res) => {
  res.send("get all fits");
};

const getFit = async (req, res) => {
  res.send("get all fits");
};

const createFit = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const fit = await Fit.create(req.body);

  res.status(StatusCodes.CREATED).json(fit);
};

const updateFit = async (req, res) => {
  res.send("update a fit");
};

const deleteFit = async (req, res) => {
  res.send("delete fit");
};

module.exports = { getAllFits, getFit, createFit, updateFit, deleteFit };
