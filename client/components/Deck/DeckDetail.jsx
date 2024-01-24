import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import { getProgress } from "../../redux/currentDeckSlice";

const DeckDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deckProgress = useSelector((state) => state.currentDeck.deckprogress);

  useEffect(() => {
    const fetchDeckProgress = async () => {
      try {
        const body = JSON.stringify({ deckId: params.deckId });

        const response = await fetch(`http://localhost:3000/deck/summary`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        });

        if (response.status === 201) {
          const content = await response.json();
          dispatch(getProgress(content));
        }
      } catch (error) {
        console.error("Error fetching watch list:", error);
      }
    };
    fetchDeckProgress();
  }, []);

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

  const calculateTotal = (progress) => {
    let total = 0;
    for (const key in progress) {
      if (progress.hasOwnProperty(key)) {
        total += progress[key];
      }
    }
    return total;
  };

  const deckProgressInfo = deckProgress[0]
    ? {
        total: calculateTotal(deckProgress[0]),
        good: deckProgress[0].good || 0,
        average: deckProgress[0].average || 0,
        poor: deckProgress[0].poor || 0,
      }
    : {
        total: 0,
        good: 0,
        average: 0,
        poor: 0,
      };

  const data = [
    ["Status", "Count"],
    ["Good", deckProgressInfo.good],
    ["Average", deckProgressInfo.average],
    ["Poor", deckProgressInfo.poor],
  ];

  return (
    <div className="deck-summary">
      <h1> Current Learning Progress</h1>
      <div className="deck-stats">
        <p>
          There are <span>{deckProgressInfo.total}</span> cards in this deck{" "}
          <br />
          You have a good understanding of <span>
            {deckProgressInfo.good}
          </span>{" "}
          cards <br />
          <span>{deckProgressInfo.average + deckProgressInfo.poor}</span> need
          more review
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
