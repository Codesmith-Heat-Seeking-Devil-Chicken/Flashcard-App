import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getDecks } from "../../utils/requests.js";

const CardForm = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");

  const currentDeckID = params.deckId;

  // Create handler function for onSubmit (will need to make a fetch request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCard = {
      front: cardFront,
      back: cardBack,
      deckId: params.deckId,
    };

    const newCardString = JSON.stringify(newCard);

    await fetch(`http://localhost:3000/card`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: newCardString,
    });

    // redirect will need to occur from server (Automatically?)

    await getDecks();

    navigate(`/deck/${currentDeckID}`);
  };

  return (
    <div className="CardForm">
      <div className="formSection">
        <h4>Please Add Card Content </h4>
        <form class="formContent" onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="cardFront"
              placeholder="Front of card"
              onChange={(e) => setCardFront(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="text"
              name="cardBack"
              placeholder="Back of card"
              onChange={(e) => setCardBack(e.target.value)}
              required
            />
          </label>
          <div>
            <button type="submit">Add Card</button>
            <button
              onClick={() => {
                navigate(`/deck/${params.deckId}`);
              }}
            >
              Back to Deck
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardForm;
