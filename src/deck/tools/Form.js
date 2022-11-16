import React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";

function Form({ obj, setObj, submitHandler }) {
  const route = useRouteMatch();
  const history = useHistory();

  function changeHandler(event) {
    setObj({
      ...obj,
      [event.target.name]: event.target.value,
    });
  }

  // if the url includes "cards" then it's the edit card form}
  if (route.url.includes("cards")) {
    return (
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            rows="3"
            onChange={changeHandler}
            defaultValue={obj.front}
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
            defaultValue={obj.back}
          ></textarea>
        </div>
        <button
          onClick={() => history.push(`/decks/${obj.deckId}`)}
          className="btn btn-secondary mr-2"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  } else {
    // if the url doesn't include "cards" then it's the edit deck form
    return (
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            defaultValue={obj.name}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            defaultValue={obj.description}
            onChange={changeHandler}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.push(`/decks/${obj.Id}`)}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary mx-2">
          Submit
        </button>
      </form>
    );
  }
}
export default Form;
