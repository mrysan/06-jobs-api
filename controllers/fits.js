const Fit = require("../models/Fit");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllFits = async (req, res) => {
  const fits = await Fit.find({ createdBy: req.user.userId }).sort("createdAt");

  res.status(StatusCodes.OK).json({ fits, count: fits.length });
};

const getFit = async (req, res) => {
  const {
    user: { userId },
    params: { id: fitId },
  } = req;

  const fit = await Fit.findOne({
    _id: fitId,
    createdBy: userId,
  });

  if (!fit) {
    throw new NotFoundError(`No fit with id ${fitId}`);
  }
  res.status(StatusCodes.OK).json(fit);
};

const createFit = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const fit = await Fit.create(req.body);

  res.status(StatusCodes.CREATED).json(fit);
};

const updateFit = async (req, res) => {
  const {
    body: { title, description },
    user: { userId },
    params: { id: fitId },
  } = req;

  if (title === "" || description === "") {
    throw new BadRequestError("Title and Description fields cannot be empty");
  }

  const fit = await Fit.findByIdAndUpdate(
    { _id: fitId, createdBy: userId },
    req.body,
    { new: true, runValidators: true },
  );

  if (!fit) {
    throw new NotFoundError(`No fit with id ${fitId}`);
  }
  res.status(StatusCodes.OK).json(fit);
};

const deleteFit = async (req, res) => {
  const {
    user: { userId },
    params: { id: fitId },
  } = req;

  const fit = await Fit.findOneAndDelete({ _id: fitId, createdBy: userId });
  if (!fit) {
    throw new NotFoundError(`No fit with id ${fitId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "The entry was deleted." });
};

module.exports = { getAllFits, getFit, createFit, updateFit, deleteFit };
