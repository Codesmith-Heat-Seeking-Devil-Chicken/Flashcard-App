import React from "react";
import { useNavigate } from "react-router-dom";
import { getDecks } from "../../utils/requests";

const Deck = ({ deck, index }) => {
  const navigate = useNavigate();

  // create 2 handler functions for clicking into deck and deleting deck
  const handleDeckClick = () => {
    navigate(`/deck/${deck._id}`);
  };

  const handleDelete = async () => {
    const body = JSON.stringify({ deckId: deck._id });
    const response = await fetch(`http://localhost:3000/deck`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body,
    });

    // invoke getDecks
    if (response.status === 202) getDecks();
  };

//   const handleEdit = async () => {
//     const response = await fetch(`http://localhost:3000/deck`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({deckName: ''}),
//     })
//     // .then(function (response) {
//     //   return response.json();
//     // })
//     // .then(function(data) {
//     //   console.log(data);
//     // })

//     // invoke getDecks
//  if (response.status === 203) await getDecks();

//   };

  const colorsArray = [
    "#00A7ED",
    "#8361F4",
    "#E75552",
    "#EA9823",
    "#87CE45",
    "#93D5F3",
    "#29BDB6",
  ];

  const styles = {
    backgroundColor:
      colorsArray[Math.floor(Math.random() * colorsArray.length + 1) - 1],
  };

  return (
    <div id={`deck${index}`} className="Deck">
      <div className="deckColor" onClick={handleDeckClick} style={styles}>
        <h2>{deck.deckName}</h2>
      </div>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Deck;
