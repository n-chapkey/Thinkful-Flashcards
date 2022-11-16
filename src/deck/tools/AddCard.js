import React, { useState } from "react";

import { useParams, useHistory } from "react-router-dom";
import { createCard } from "../../utils/api";
import Form from "./Form";

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
      <Form obj={formData} setObj={setFormData} submitHandler={handleSubmit} />
    </div>
  );
}

export default AddCard;
