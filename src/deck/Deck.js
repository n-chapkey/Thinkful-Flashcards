import React, { useEffect, useState } from "react";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import {
  useParams,
  Link,
  Route,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import Study from "./tools/Study";
import AddCard from "./tools/AddCard";
import EditDeck from "./tools/EditDeck";
import EditCard from "./tools/EditCard";

function Deck() {
  let { deckId } = useParams();
  let [deck, setDeck] = useState({});
  let [cardList, setCardList] = useState([]);
  const history = useHistory();
  const thisRoute = useRouteMatch();

  // Fetch the deck from the API
  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
      setCardList(response.cards);
    }
    loadDeck();
  }, [deckId]);

  function handleDeleteDeck() {
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

  function handleDeleteCard(cardId) {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      async function deleteCardFromAPI() {
        await deleteCard(cardId);
        history.go(0);
      }
      deleteCardFromAPI();
    }
  }

  const renderCards = cardList.map((card) => {
    return (
      <div
        key={card.id}
        className="card text-bg-light mb-3"
        style={{ maxWidth: "36rem" }}
      >
        <div className="card-body">
          <div className="row">
            <h5 className="card-title col">{card.front}</h5>
            <p className="card-text pull-right px-4">{card.back}</p>
          </div>

          <button
            type="button"
            className="btn btn-danger"
            style={{ float: "right" }}
            onClick={() => handleDeleteCard(card.id)}
          >
            <i className="icon-trash"></i>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ float: "right", marginRight: "20px" }}
            onClick={() => history.push(`/decks/${deckId}/cards/${card.id}/edit`)}
          >
            <i className="icon-pencil"></i>Edit
          </button>
        </div>
      </div>
    );
  });
  return (
    <div>
      {/* deck name and description */}
      <Route exact path={`${thisRoute.path}`}>
        {/* nav breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="icon-home"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>

        {/* Deck header */}
        <div>
          <h4>{deck.name}</h4>
          <p>{deck.description}</p>

          {/* Edit Button */}
          <button
            type="button"
            className="btn btn-secondary"
            style={{ margin: "5px" }}
            onClick={() => history.push(`/decks/${deckId}/edit`)}
          >
            <i className="icon-pencil"></i> Edit
          </button>

          {/* Study Button */}
          <button
            type="button"
            className="btn btn-primary"
            style={{ margin: "5px" }}
            onClick={() => history.push(`/decks/${deckId}/study`)}
          >
            <i className="icon-book"></i> Study
          </button>

          {/* Add Cards Button */}
          <button
            type="button"
            className="btn btn-primary"
            style={{ margin: "5px" }}
            onClick={() => history.push(`/decks/${deckId}/cards/new`)}
          >
            <i className="icon-plus"></i> Add Cards
          </button>
          {/* Delete Button */}
          <button
            type="button"
            className="btn btn-danger"
            style={{ float: "right" }}
            onClick={handleDeleteDeck}
          >
            <i className="icon-trash"></i>
          </button>
        </div>
        {renderCards}
      </Route>
      <Route path={`${thisRoute.path}/study`}>
        {/* nav breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="icon-home"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link to={thisRoute.url}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <Study deckName={deck.name} />
      </Route>
      <Route path={`${thisRoute.path}/cards/new`}>
        {/* nav breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="icon-home"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Card
            </li>
          </ol>
        </nav>
        <h4>{deck.name}: Add Card</h4>
        <AddCard />
      </Route>
      <Route path={`${thisRoute.path}/cards/:cardId/edit`}>
        <EditCard deckName={deck.name}/>
      </Route>
      <Route path={`${thisRoute.path}/edit`}>
        {/* nav breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="icon-home"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link to={`${thisRoute.url}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
        <EditDeck />
      </Route>
    </div>
  );
}

export default Deck;
