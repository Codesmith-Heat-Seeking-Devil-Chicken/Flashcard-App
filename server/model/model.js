const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const { string } = require('yargs');
const Schema = mongoose.Schema;

//create a schema for our cards
const cardSchema = new Schema({
  front: { type: String, required: true },
  back: { type: String, required: true },
  status: { type: String, default: 'poor' },
});

//create schema for our deck
const deckSchema = new Schema({
  deckName: { type: String, required: true },
  cards: [cardSchema], // array of cards, each card is an obj
});

// const deckSchema = newSchema({
//   _id: ObjectId(),
//   deckName: String,
//   cards: [
//     {
//       _id: ObjectId(),
//       front: String,
//       back: String,
//       status: String,
//     },
//   ],
// });

// const tempCar = await Car.findOneAndUpdate(
//   {
//     make: req.params.make,
//   },
//   { $set: { "models.$[e1].reviews.$[e2]": result.value } },
//   {
//     arrayFilters: [
//       { "e1.name": req.params.model },
//       { "e2._id": req.params._id },
//     ],
//   }
// );

// const tempDeck = await Deck.findOneAndUpdate(
//   {
//     _id: cardId,
//   },
//   { $set: { "cards.$[e1]": status } },
//   {
//     arrayFilters: [
//       { "e1._id": cardId },
//     ]
//   }
// )

module.exports = mongoose.model('Deck', deckSchema, 'Deck');
