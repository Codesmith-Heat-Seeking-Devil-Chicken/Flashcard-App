import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { handleCardDelete } from "../../utils/requests";

export const CardControls = ({ cardInfo }) => {
  const handleDelete = async () => {
    await handleCardDelete(cardInfo);
  };

  return (
    <div className="inner-card-controls">
      <button className="ctrl-btn" onClick={handleDelete}>
        <FaTrashAlt />
      </button>
    </div>
  );
};
