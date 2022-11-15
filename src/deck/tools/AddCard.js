import React, { useState } from "react";

import { useParams, useHistory } from "react-router-dom";
import { createCard } from "../../utils/api";

function AddCard() {
  const history = useHistory();
  const { deckId } = useParams();
  const initialFormState = {
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  // When user presses Done
  function handleDone() {
    history.push(`/decks/${deckId}`);
  }

  //When form is being edited
  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  //When user presses Save
  function handleSubmit(event) {
    event.preventDefault();
    const newCard = {
      front: formData.front,
      back: formData.back,
    };
    async function createNewCard() {
      await createCard(deckId, newCard);
      history.go(0);
    }
    createNewCard();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            rows="3"
            placeholder="Front side of card"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            rows="3"
            placeholder="Back side of card"
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleDone}
        >
          Done
        </button>
        <button type="submit" className="btn btn-primary mx-2">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;
