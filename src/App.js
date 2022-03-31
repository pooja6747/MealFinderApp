import React, { useState } from "react";
import "./App.css";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const APP_ID = "4e9f05eb";
  const APP_KEY = "9b904d703fa0d46a88ce1ac63f29f498";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("no data found");
      }
      console.log(result);
      //hits is used for data hits gives receipe
      setRecipes(result.data.hits);
      //input clear
      setQuery("");
      setAlert("");
    } else {
      setAlert("Please fill the form");
    }
  };

  // onchange for input feild
  const onChange = e => setQuery(e.target.value);

  // on button click API data show
  const onSubmit = e => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="App">
      <h1>Food Searching App</h1>

      <form onSubmit={onSubmit} className="search-form">
      <Alert alert={alert ? "No food found" : `${query}+found`}  />
        {/* {alert == "result" && <Alert alert={alert} />} */}
        <input type="text" name="query" onChange={onChange} value={query}  placeholder="Search Food" />
       
        <input type="submit" value="Search" />
      </form>

      <div className="recipes">
        {recipes !== [] &&
          recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
}

export default App;
