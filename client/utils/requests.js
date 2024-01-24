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

export const updateCardStatus = (updateInfo) => {
  // TODO: Update the address
  // const response = await fetch("http://localhost:3000");
  // if (response.status === 200) {
  //   const body = await response.json();
  //   store.dispatch(getProgress(body));
  // }
};

export const handleCardDelete = async (deleteInfo) => {
  const body = JSON.stringify(deleteInfo);

  // TODO: double check the address
  // await fetch(`http://localhost:3000/deck/`, {
  //   method: "DELETE",
  //   headers: { "Content-Type": "application/json" },
  //   body,
  // });

  // if (index === cards.length - 1) setIndex(Math.max(index - 1, 0));

  // await getDecks();
};
