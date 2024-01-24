const cardController = {};
const Deck = require("../model/model");

cardController.getCard = (req, res, next) => {
  // get request with deckId in req.body (show card)
  const deckId = req.body.deckId;

  Deck.findById(deckId)
    .then((result) => {
      res.locals.result = result;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

cardController.addCard = async (req, res, next) => {
  const { deckId, front, back, status } = req.body;
  const deck = await Deck.findById(deckId);
  deck.cards.push({ front, back, status });
  await deck.save();
  return next();
};

cardController.deleteCard = (req, res, next) => {
  // delete request with deckId, cardId in req.body
  const { deckId, cardId } = req.body;
  Deck.updateOne({ _id: deckId }, { $pull: { cards: { _id: cardId } } })
    .then((result) => {
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = cardController;
