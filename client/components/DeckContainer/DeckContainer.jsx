import React, { useState } from "react";
import { useSelector } from "react-redux";
import Deck from "../Deck/Deck.jsx";
import { getDecks } from "../../utils/requests.js";

const DeckContainer = () => {
  const [newDeck, setNewDeck] = useState("");
  const decks = useSelector((state) => state.decks.decks);
  const searchDecks = useSelector((state) => state.decks.searchDecks);

  // create function to handle new deck form submissions
  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({ deckName: newDeck, cards: [] });

    const response = await fetch("http://localhost:3000/deck", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (response.status === 201) {
      await getDecks();
      setNewDeck("");
    }
  };

  return (
    <div className="DeckContainer">
      <div className="formDiv">
        <div className="deckSquare">
          <h2>Decks</h2>
        </div>

        <div className="addNewDeck">
          <h3>Flashcards</h3>
          <h4>Add a new deck below</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter deck name"
              value={newDeck}
              onChange={(e) => setNewDeck(e.target.value)}
            ></input>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>

      <section className="deckSection">
        {searchDecks.length > 0 ? (
          searchDecks[0].length === 0 ? (
            <h2>No Matching Results</h2>
          ) : (
            searchDecks.map((deck, index) => (
              <Deck key={deck._id} deck={deck} index={index} />
            ))
          )
        ) : (
          decks.map((deck, index) => (
            <Deck key={deck._id} deck={deck} index={index} />
          ))
        )}
      </section>
    </div>
  );
};

export default DeckContainer;
