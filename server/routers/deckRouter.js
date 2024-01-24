const express = require("express");
const deckController = require("../controllers/deckController");
const router = express.Router();

// tested.
router.get("/", deckController.getDeck, (req, res) => {
  console.log("get deck router");
  return res.status(200).send(res.locals.result);
});

router.post("/summary", deckController.getSummary, (req, res) => {
  return res.status(201).json(res.locals.deckSummary);
});

// tested.
router.post("/", deckController.addDeck, (req, res) => {
  console.log("add deck router");
  return res.status(201).json(res.locals.newDeck);
});

// tested.
router.delete("/", deckController.deleteDeck, (req, res) => {
  console.log("delete deck router");
  return res.status(202).json("Deleted deck");
});

// tested.
router.patch("/", deckController.editDeck, (req, res) => {
  console.log("edit deck router");
  return res.status(203).json(res.locals.updated);
});

module.exports = router;
