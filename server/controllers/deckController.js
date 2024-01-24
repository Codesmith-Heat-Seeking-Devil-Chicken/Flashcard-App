const deckController = {};
const mongoose = require("mongoose");
const Deck = require("../model/model");

deckController.getDeck = (req, res, next) => {
  //get request (optionally with deckId in req.body)
  if (req.body.deckId) {
    Deck.findById(req.body.deckId)
      .then((result) => {
        res.locals.result = result;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  } else {
    Deck.find()
      .then((result) => {
        res.locals.result = result;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  }
};

deckController.getSummary = async (req, res, next) => {
  const deckId = new mongoose.Types.ObjectId(req.body.deckId);

  try {
    const result = await Deck.aggregate([
      {
        $match: { _id: deckId },
      },
      {
        $unwind: "$cards",
      },
      {
        $group: {
          _id: "$cards.status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          status: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    const reformatResult = result.reduce((acc, { status, count }) => {
      acc[status] = count;
      return acc;
    }, {});

    res.locals.deckSummary = reformatResult;
    return next();
  } catch (err) {
    return next(err);
  }
};

deckController.updateProgress = async (req, res, next) => {
  let { deckId, cardId, status } = req.body;

  const deck = await Deck.findById(deckId);
  const card = deck.cards.id(cardId);
  card.status = status;
  await deck.save();

  return next();
};

deckController.addDeck = (req, res, next) => {
  // post request with deckName, cards in req.body (array of objects)
  const { deckName, cards } = req.body;
  Deck.create({ deckName, cards })
    .then((result) => {
      console.log("add result", result);
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
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

deckController.editDeck = (req, res, next) => {
  // patch request with deckId, deckName in req.body
  // Dan's code here!!!!
  const { deckId, deckName } = req.body;

  Deck.updateOne({ _id: deckId }, { deckName: deckName })
    .then((result) => {
      res.locals.updated = result;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = deckController;
