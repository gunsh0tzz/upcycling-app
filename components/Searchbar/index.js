import Fuse from "fuse.js";
import { useState } from "react";
import styled from "styled-components";

import { ideas as defaultIdeas } from "@/lib/db";

const StyledSearchbar = styled.input`
  border: 1px solid black;
  padding: 0.5rem;
`;

export default function Searchbar() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const searchResult = fuse.search(e.target.value);

    console.clear();
    console.log(searchResult);
  };

  const fuse = new Fuse(defaultIdeas, {
    keys: ["hashtags"],
  });

  return (
    <StyledSearchbar
      placeholder="Type to search ..."
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
        handleInputChange(e);
      }}
    />
  );
}
