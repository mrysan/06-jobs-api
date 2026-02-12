const express = require("express");
const router = express.Router();

const {
  getAllFits,
  getFit,
  createFit,
  updateFit,
  deleteFit,
} = require("../controllers/fits");

router
  .route("/")
  .get(getAllFits)
  .post(createFit)
  .patch(updateFit)
  .delete(deleteFit);

router.route("/:id").get(getFit);

module.exports = router;
