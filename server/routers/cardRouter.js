const express = require('express');
const cardController = require('../controllers/cardController');
const router = express.Router();

// tested.
router.get('/', cardController.getCard, (req, res) => {
  console.log('get card router');
  return res.status(200).json(res.locals.result);
});

// tested.
router.post('/', cardController.addCard, (req, res) => {
  console.log('add card router');
  return res.status(201).json('card added');
});

// tested.
router.delete('/', cardController.deleteCard, (req, res) => {
  console.log('delete card router');
  return res.status(202).json('card deleted');
});

module.exports = router;
