import  React, {useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../../utils/api";

function CreateDeck({ deckList, setDeckList }) {
  const initialFormState = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDeck = {
      name: formData.name,
      description: formData.description,
      cards: [],
    };
    async function createNewDeck() {
      const {id} = await createDeck(newDeck);
      
      history.push(`/decks/${id}`);
    }
    createNewDeck();
  };

  function handleCancel(){
    history.push("/");
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
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      {/* form */}
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Deck Name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            placeholder="Brief description of the deck"
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="button" className="btn btn-secondary mx-2" onClick={handleCancel} >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
