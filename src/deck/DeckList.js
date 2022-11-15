import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

function DeckList({ deckList }) {
  const history = useHistory();

  function handleDelete(deckId) {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      async function deleteDeckFromAPI() {
        await deleteDeck(deckId);
        history.go(0);
      }
      deleteDeckFromAPI();
    }
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-secondary "
        style={{ marginBottom: "1rem" }}
        onClick={() => history.push("/decks/new")}
      >
        <i className="icon-plus"></i> Create Deck
      </button>

      {deckList.map((deck) => {
        return (
          <div
            key={deck.id}
            className="card text-bg-light mb-3"
            style={{ maxWidth: "36rem" }}
          >
            <div className="card-body">
              <div className="row">
                <h5 className="card-title col">{deck.name}</h5>
                <p className="card-text pull-right px-4">
                  {deck.cards.length} cards
                </p>
              </div>
              <p className="card-text">{deck.description}</p>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => history.push(`/decks/${deck.id}`)}
                style={{ margin: "5px" }}
              >
                <i className="icon-eye-open"></i> View
              </button>

              <button
                type="button"
                className="btn btn-primary"
                style={{ margin: "5px" }}
                onClick={() => history.push(`/decks/${deck.id}/study`)}
              >
                <i className="icon-book"></i> Study
              </button>

              <button
                type="button"
                className="btn btn-danger"
                style={{ float: "right" }}
                onClick={() =>handleDelete(deck.id)}
              >
                <i className="icon-trash"></i>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DeckList;
