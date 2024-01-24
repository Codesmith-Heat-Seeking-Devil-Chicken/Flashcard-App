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

module.exports = mongoose.model('Deck', deckSchema, 'Deck');
