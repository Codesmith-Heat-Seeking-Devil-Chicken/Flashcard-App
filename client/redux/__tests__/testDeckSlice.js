const { decksSlice } = require("../decksSlice");
const { loadDecks, addDeck, deleteDeck } = require("../decksSlice");

describe("loadDeck reducer", () => {
  it("should set the deck in the state", () => {
    const initialState = { decks: [] };
    const action = { type: loadDecks.type, payload: "decks" };
    const nextState = decksSlice.reducer(initialState, action);

    expect(nextState.decks).toEqual("decks");
  });
});

describe("addDeck reducer", () => {
  it("should add a deck to the state", () => {
    const initialState = { decks: ["deck1"] };
    const action = { type: addDeck.type, payload: "deck2" };
    const nextState = decksSlice.reducer(initialState, action);

    expect(nextState.decks).toEqual(["deck1", "deck2"]);
  });
});

describe("deleteDeck reducer", () => {
  it("should delete a deck from the state", () => {
    const initialState = { decks: ["deck1", "deck2"] };
    const action = { type: deleteDeck.type, payload: 1 };
    const nextState = decksSlice.reducer(initialState, action);

    expect(nextState.decks).toEqual(["deck1"]);
  });
});
