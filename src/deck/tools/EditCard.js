import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck,readCard, updateCard } from "../../utils/api";
import React, { useEffect, useState } from "react";

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
  }, [deckId]);

  function submitHandler(event) {
    event.preventDefault();
    async function updateCardInTheAPI() {
        await updateCard(card);
        history.push(`/decks/${deckId}`);
    }
    updateCardInTheAPI();
  }

  function changeHandler(event) {
    setCard({
      ...card,
      [event.target.name]: event.target.value,
    });
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
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            rows="3"
            onChange={changeHandler}
            defaultValue={card.front}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            rows="3"
            onChange={changeHandler}
            defaultValue={card.back}
          ></textarea>
        </div>
        <button
          onClick={() => history.push(`/decks/${deckId}`)}
          className="btn btn-secondary mr-2"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditCard;
