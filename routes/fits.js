const express = require("express");
const router = express.Router();

const {
  getAllFits,
  getFit,
  createFit,
  updateFit,
  deleteFit,
} = require("../controllers/fits");

router.route("/").get(getAllFits).post(createFit);

router.route("/:id").get(getFit).patch(updateFit).delete(deleteFit);

module.exports = router;
