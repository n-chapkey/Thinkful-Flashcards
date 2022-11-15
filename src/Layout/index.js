import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import DecksMaster from "../deck/DecksMaster";
import Deck from "../deck/Deck";


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <DecksMaster />
          </Route>
          <Route exact path="/decks/new">
            <DecksMaster />
          </Route>

          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route exact path="/decks">
            <Redirect to="/" />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
