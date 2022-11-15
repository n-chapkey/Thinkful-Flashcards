import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";

function Study({ deckName }) {
  const [cardList, setCardList] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const history = useHistory();
  const { deckId } = useParams();
  
  // Fetch the card list from the API
  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setCardList(response.cards);
    }
    loadDeck();
  }, [deckId]);

  const renderAndValidateDeck = () => {
    if (cardList.length < 3) {
      return (
        <div>
          <h2>Not enough cards.</h2>
          <p>
            You need at least 3 cards to study. There are {cardList.length}{" "}
            cards in this deck.
          </p>
          <Link to={`/decks/${deckId}/cards/new`}>
            <button type="button" className="btn btn-primary">
              <i className="icon-plus"></i> Add Cards
            </button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {cardIndex + 1} of {cardList.length}
            </h5>
            <div className="card-text">
              {isFlipped ? cardList[cardIndex].back : cardList[cardIndex].front}
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleFlip}
            >
              Flip
            </button>
            {isFlipped ? <button
              style={{ float: "right" }}
              type="button"
              className="btn btn-primary"
              onClick={handleNext}
            >
              Next
            </button> : null}
            
          </div>
        </div>
      );
    }
  };

  // if Flip button is clicked, show opposite side of the current card
  function handleFlip() {
    if (isFlipped) {
      setIsFlipped(false);
      
    } else {
      setIsFlipped(true);
      if (cardIndex === (cardList.length - 1)) {
        if (
          window.confirm(
            "Restart Cards? \n\n Click 'cancel' to return to the home page."
          )
        ) {
          setCardIndex(0);
          setIsFlipped(false);
        } else {
          history.push(`/`);
        }
      }
    }
  }

  // if Next button is clicked, increment cardIndex to proceed the deck
  function handleNext() {
    if (cardIndex < cardList.length - 1) {
      setCardIndex(cardIndex + 1);
    }
    setIsFlipped(false);
  }


  return (
    <div>
      <h1>{deckName}: Study</h1>
      {renderAndValidateDeck()}
    </div>
  );
}

export default Study;
