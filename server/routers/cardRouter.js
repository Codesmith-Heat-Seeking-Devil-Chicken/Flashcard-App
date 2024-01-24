const express = require("express");
const cardController = require("../controllers/cardController");
const router = express.Router();

// tested.
router.get("/", cardController.getCard, (req, res) => {
  return res.status(200).json(res.locals.result);
});

// tested.
router.post("/", cardController.addCard, (req, res) => {
  return res.status(201).json("card added");
});

// tested.
router.delete("/", cardController.deleteCard, (req, res) => {
  return res.status(202).json("card deleted");
});

module.exports = router;
