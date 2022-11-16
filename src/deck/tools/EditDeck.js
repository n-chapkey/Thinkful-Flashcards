import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";
import Form from "./Form";

function EditDeck() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    loadDeck();
  }, [deckId]);

  function changeHandler(event) {
    setDeck({
      ...deck,
      [event.target.name]: event.target.value,
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    async function updateDeckInAPI() {
      await updateDeck(deck);
      history.go(0);
      console.log(deck);
    }
    updateDeckInAPI();
  }

  return (
    <div>
      <h1>Edit Deck</h1>
      <Form obj={deck} setObj={setDeck} submitHandler={submitHandler} />
    </div>
  );
}

export default EditDeck;
