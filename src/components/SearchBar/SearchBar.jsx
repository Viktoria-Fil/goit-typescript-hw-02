import React, { useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      toast.error("Write your request <3");
      return;
    }
    onSubmit(inputValue.trim());
    setInputValue("");
  };

  return (
    <header>
      <form className={css.Form} onSubmit={handleSubmit}>
        <input
          className={css.Input}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.Search} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
