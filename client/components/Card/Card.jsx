import React from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GiCheckMark } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa6";
import { updateCardStatus } from "../../utils/requests.js";
import { RxCross1 } from "react-icons/rx";
import { CardControls } from "./CardControls";

const Card = () => {
  const params = useParams();
  const dispatch = useDispatch();

  // get current card array from the global store
  const currentDeck = useSelector((state) =>
    state.decks.decks.find((deck) => deck._id === params.deckId)
  );

  // piece of state: get the boolean
  const [isFront, setIsFront] = useState(true);
  // piece of state: get the index (of the current card) (starts at zero)
  const [index, setIndex] = useState(0);

  if (!currentDeck) return null;

  const cards = currentDeck.cards;
  // get current deck ID
  const currentDeckID = currentDeck._id;

  const hasCards = cards.length > 0;

  // Get current card using index
  let cardContent;
  if (hasCards) {
    const card = cards[index];
    if (isFront) {
      cardContent = card.front;
    } else {
      cardContent = card.back;
    }
  }

  const handleCardStatus = async (selectStatus) => {
    await updateCardStatus({
      deckId: currentDeckID,
      cardId: cards[index]._id,
      status: selectStatus,
    });
    if (!hasCards || index < cards.length - 1) {
      setIndex(index + 1);
      setIsFront(true);
    }
  };

  return (
    <div className="Card">
      <div className="back-butto-container">
        <div className="backButton">
          <Link className="addCardLink" to={`/deck/${currentDeckID}`}>
            Back to Deck
          </Link>
        </div>
      </div>
      {hasCards ? (
        <div className="display-card">
          <div className="prev-button">
            {(!hasCards || index > 0) && (
              <button
                onClick={(e) => {
                  setIndex(index - 1);
                  setIsFront(true);
                }}
              >
                <GrPrevious />
              </button>
            )}
          </div>

          <div className="flashcard" onClick={(e) => setIsFront(!isFront)}>
            {/* Front or back cardContent depending on state */}
            <div className="content">
              <h2 style={{ color: isFront ? "black" : "grey" }}>
                {cardContent}
              </h2>
              {!isFront ? <h3 className="cardBack">Back of card</h3> : null}
            </div>
            <CardControls
              cardInfo={{ deckId: currentDeckID, cardId: cards[index]._id }}
              index={index}
              setIndex={setIndex}
              cards={cards}
              setIsFront={setIsFront}
            />
          </div>
          <div className="next-button">
            {(!hasCards || index < cards.length - 1) && (
              <button
                onClick={(e) => {
                  setIndex(index + 1);
                  setIsFront(true);
                }}
              >
                <GrNext />
              </button>
            )}
          </div>
        </div>
      ) : null}

      <div className="status-buttons">
        <button onClick={() => handleCardStatus("good")}>
          <GiCheckMark className="icon-checkmark" />
        </button>
        <button onClick={() => handleCardStatus("average")}>
          <FaRegCircle className="icon-circle" />
        </button>
        <button onClick={() => handleCardStatus("poor")}>
          <RxCross1 className="icon-cross" />
        </button>
      </div>
    </div>
  );
};

export default Card;
