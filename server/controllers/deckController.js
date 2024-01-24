const deckController = {};
const Deck = require('../model/model');

deckController.getDeck = (req, res, next) => {
  // get request (optionally with deckId in req.body)
  if (req.body.deckId) {
    Deck.findById(req.body.deckId)
      .then((result) => {
        console.log('deck find result: ', result);
        res.locals.result = result;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  } else {
    Deck.find()
      .then((result) => {
        console.log('Deck find result', result);
        res.locals.result = result;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  }
};

deckController.addDeck = (req, res, next) => {
  // post request with deckName, cards in req.body (array of objects)
  console.log('request body: ', req.body);
  const { deckName, cards } = req.body;
  Deck.create({ deckName, cards })
    .then((result) => {
      console.log('add result', result);
      res.locals.newDeck = result;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

deckController.deleteDeck = (req, res, next) => {
  // delete request with deckId in req.body
  const { deckId } = req.body;
  Deck.findByIdAndDelete(deckId)
    .then((result) => {
      console.log('delete result', result);
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

deckController.editDeck = (req, res, next) => {
  // patch request with deckId, deckName in req.body
  // Dan's code here!!!!
  console.log('editing deck.');
  console.log('request body.', req.body);
  const { deckId, deckName } = req.body;

  Deck.updateOne({ _id: deckId }, { deckName: deckName })
    .then((result) => {
      console.log('result of update', result);
      res.locals.updated = result;
      return next();
    })
    .catch((err) => {
      console.log('error error error');
      return next(err);
    });
};

module.exports = deckController;
