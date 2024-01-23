const { currentDeckSlice } = require("../currentDeckSlice");
const {
  selectDeck,
  loadCards,
  addCard,
  deleteCard,
} = require("../currentDeckSlice");

describe("selectDeck reducer", () => {
  it("should set the deck ID in the state", () => {
    const initialState = { id: "", cards: [] };
    const action = { type: selectDeck.type, payload: "deckId" };
    const nextState = currentDeckSlice.reducer(initialState, action);

    expect(nextState.id).toEqual("deckId");
    expect(nextState.cards).toEqual([]);
  });
});

describe("loadCards reducer", () => {
  it("should set the cards in the state", () => {
    const initialState = { id: "", cards: [] };
    const action = { type: loadCards.type, payload: ["card1", "card2"] };
    const nextState = currentDeckSlice.reducer(initialState, action);

    expect(nextState.cards).toEqual(["card1", "card2"]);
    expect(nextState.id).toEqual("");
  });
});

describe("addCard reducer", () => {
  it("should add a card to the state", () => {
    const initialState = { id: "", cards: ["card1"] };
    const action = { type: addCard.type, payload: "card2" };
    const nextState = currentDeckSlice.reducer(initialState, action);

    expect(nextState.cards).toEqual(["card1", "card2"]);
    expect(nextState.id).toEqual("");
  });
});

describe("deleteCard reducer", () => {
  it("should delete a card from the state", () => {
    const initialState = { id: "", cards: ["card1", "card2"] };
    const action = { type: deleteCard.type, payload: 1 };
    const nextState = currentDeckSlice.reducer(initialState, action);

    expect(nextState.cards).toEqual(["card1"]);
    expect(nextState.id).toEqual("");
  });
});
