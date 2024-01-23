import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";

const DeckDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deckProgress = useSelector((state) => state.deckProgress);

  // TODO: Update with fetched result
  //   useEffect(() => {
  //     dispatch(fetchDeckProgress(params.deckId));
  //   }, []);

  const data = [
    ["Status", "Count"],
    ["Good", 11],
    ["Average", 5],
    ["Poor", 6],
  ];

  const options = {
    titleTextStyle: {
      fontSize: 18,
      bold: true,
      textAlign: "center",
    },
    colors: ["#4CAF50", "#FFC107", "#FF5722"],
  };

  const handleStartLearning = () => {
    navigate(`/deck/${params.deckId}/card`);
  };

  const handleAddCard = () => {
    navigate(`/deck/${params.deckId}/addCard`);
  };

  const handleBackToHome = () => {
    navigate(`/`);
  };

  return (
    <div className="deck-summary">
      <h1> Current Learning Progress</h1>
      <div className="deck-stats">
        <p>
          There are x cards in this deck <br></br>
          You have a good understanding of A cards <br></br>B + C need more
          review
        </p>
      </div>
      <div className="summary-chart">
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"800px"}
          height={"700px"}
        />
      </div>
      <div className="deck-detail-button">
        <div className="back-to-home-button">
          <button onClick={handleBackToHome}>Back</button>
        </div>
        <div className="add-card-button">
          <button onClick={handleAddCard}>+ Add Cards!</button>
        </div>
        <div className="start-learning-button">
          <button onClick={handleStartLearning}>Start Learning!</button>
        </div>
      </div>
    </div>
  );
};

export default DeckDetail;
