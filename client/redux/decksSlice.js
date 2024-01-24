import { createSlice } from "@reduxjs/toolkit";

export const decksSlice = createSlice({
  name: "decks",
  initialState: {
    decks: [],
    searchDecks: [],
  },
  reducers: {
    loadDecks: (state, action) => {
      state.decks = action.payload;
    },
    addDeck: (state, action) => {
      state.decks.push(action.payload);
    },
    deleteDeck: (state, action) => {
      state.decks = state.decks.filter(
        (deck, index) => index !== action.payload
      );
    },
    resetSearchDeck: (state, action) => {
      state.searchDecks = [];
    },
    updateSearchDeck: (state, action) => {
      state.searchDecks = action.payload;
    },
  },
});

export const {
  loadDecks,
  addDeck,
  deleteDeck,
  resetSearchDeck,
  updateSearchDeck,
} = decksSlice.actions;

export default decksSlice.reducer;
