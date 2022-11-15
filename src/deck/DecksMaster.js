import React from "react";
import { useEffect, useState } from "react";
import { listDecks } from "../utils/api/index";
import { Route } from "react-router-dom";
import DeckList from "./DeckList";
import CreateDeck from "./tools/CreateDeck";

// "decks": [
//   {
//     "id": 1,
//     "name": "...",
//     "description": "..."
//   }
// ],
function DeckMaster() {
  const [deckList, setDeckList] = useState([]);

  // Fetch the deck list from the API
  useEffect(() => {
    async function loadDecks() {
      const response = await listDecks();
      setDeckList(response);
    }
    loadDecks();
  }, []);

  return (
    <div>
      <Route exact path="/">
        <DeckList deckList={deckList} />
      </Route>
      <Route path="/decks/new">
        <CreateDeck deckList={deckList} setDeckList={setDeckList}/>
      </Route>
    </div>
  );
}

export default DeckMaster;
