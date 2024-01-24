const cardController = {};
const Deck = require('../model/model');

cardController.getCard = (req, res, next) => {
  // get request with deckId in req.body (show card)
  const deckId = req.body.deckId;
  // console.log('deckId', deckId);
  
  Deck.findById(deckId)
    .then((result) => {
      // console.log('returned deck: ', result);
      res.locals.result = result;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

cardController.addCard = async (req, res, next) => {
  // post request with deckId, front, back in req.body
  const { deckId, front, back } = req.body;
  const deck = await Deck.findById(deckId);
  deck.cards.push({ front, back });
  await deck.save();

  console.log('created card');
  return next();
};

cardController.deleteCard = (req, res, next) => {
  // delete request with deckId, cardId in req.body
  const { deckId, cardId } = req.body;
  Deck.updateOne({ _id: deckId}, {$pull: {cards: {_id: cardId}}})
    .then((result) => {
      // console.log('delete result', result);
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = cardController;
