import React, { useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
interface ISearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }:ISearchBarProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
