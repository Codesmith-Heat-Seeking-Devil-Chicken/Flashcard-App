import { store } from "../redux/store";
import { loadDecks } from "../redux/decksSlice";
import { getProgress, deleteCard } from "../redux/currentDeckSlice";

export const getDecks = async () => {
  const response = await fetch("http://localhost:3000/deck");

  if (response.status === 200) {
    const body = await response.json();
    store.dispatch(loadDecks(body));
  }
};

export const getDeckProgress = (deckId) => {
  return async (dispatch) => {
    try {
      const body = JSON.stringify({ deckId: deckId });

      const response = await fetch(`http://localhost:3000/deck/summary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      const content = await response.json();
      store.dispatch(getProgress(content));
    } catch (error) {
      console.error("Error fetching watch list:", error);
    }
  };
};

export const updateCardStatus = async (updateInfo) => {
  const body = JSON.stringify(updateInfo);
  const response = await fetch("http://localhost:3000/deck/updateProgress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  if (response.status === 201) {
    const result = await response.json();
    console.log("Here checking body: ", result);
  }
};

export const handleCardDelete = async (
  deleteInfo,
  setIndex,
  index,
  cards,
  setIsFront
) => {
  const body = JSON.stringify(deleteInfo);

  const response = await fetch("http://localhost:3000/card", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body,
  });
  if (response.status === 202) {
    const result = await response.json();
    if (index === cards.length - 1) setIndex(Math.max(index - 1, 0));
    setIsFront(true);
  }
  await getDecks();
};
