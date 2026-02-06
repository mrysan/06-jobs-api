const getAllFits = async (req, res) => {
  res.send("get all fits");
};

const getFit = async (req, res) => {
  res.send("get all fits");
};

const createFit = async (req, res) => {
  res.json(req.user);
};

const updateFit = async (req, res) => {
  res.send("update a fit");
};

const deleteFit = async (req, res) => {
  res.send("delete fit");
};

module.exports = { getAllFits, getFit, createFit, updateFit, deleteFit };
