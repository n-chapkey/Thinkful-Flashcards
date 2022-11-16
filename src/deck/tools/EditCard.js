import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck,readCard, updateCard } from "../../utils/api";
import React, { useEffect, useState } from "react";
import Form from "./Form";

function EditCard({ deckName }) {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [card, setCard] = useState({});
  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function loadCard() {
      const deckResponse = await readDeck(deckId);
      setDeck(deckResponse);
      const cardResponse = await readCard(cardId);
      setCard(cardResponse);
    }
    loadCard();
  }, [deckId, cardId]);

  function submitHandler(event) {
    event.preventDefault();
    async function updateCardInTheAPI() {
        await updateCard(card);
        history.push(`/decks/${deckId}`);
        history.go(0);
    }
    updateCardInTheAPI();
  }

  return (
    <div>
      {/* nav breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="icon-home"></i> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>

      {/* form */}
      <Form obj={card} setObj={setCard} submitHandler={submitHandler}/>
    </div>
  );
}

export default EditCard;
