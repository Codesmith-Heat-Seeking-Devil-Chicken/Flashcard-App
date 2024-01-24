import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getDecks } from "../../utils/requests.js";

const DeckForm = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [decksName, setDecksName] = useState("");

  const currentDeckID = params.deckId;

  // Create handler function for onSubmit (will need to make a fetch request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDeck = {
      deckId: currentDeckID,
      deckName: decksName,
    };
    console.log(newDeck);
    const newDeckString = JSON.stringify(newDeck);

    await fetch(`http://localhost:3000/deck`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: newDeckString,
    });

    await getDecks();

    navigate(`/`);
  };

  return (
    <div className="DeckForm">
      <div className="deckFormSection">
        <h4>Please Add New Deck Content </h4>
        <form class="deckFormContent" onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="deckName"
              placeholder="Deck Name"
              onChange={(e) => setDecksName(e.target.value)}
              required
            />
          </label>
          <div>
            <button type="submit">Update Deck</button>
            <button
              onClick={() => {
                navigate(`/`);
              }}
            >
              Back to Decks
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeckForm;
