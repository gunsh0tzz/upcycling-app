import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Link from "next/link";

const StyledContainer = styled.div`
  box-shadow: 0.1rem 0.1rem 0.5rem black;
  width: fit-content;

  margin: 2rem 0;
`;

const StyledSearchbar = styled.input`
  border: none;
  padding: 0.5rem;
  width: 15rem;

  background-color: var(--green-300);
  color: white;

  &::placeholder {
    color: white;
  }
`;

const StyledButton = styled.button`
  border: none;
  padding: 0.5rem;

  background-color: var(--green-200);
  color: white;

  &:hover {
    background-color: var(--green-100);
  }
`;

const StyledListItem = styled.li`
  list-style: none;
  border: 1px solid black;
  width: 15rem;
  padding: 0.25rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.125);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Searchbar({
  suggestions,
  onInputChange,
  searchValue,
  onClickEvent,
}) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const router = useRouter();

  function handleChangeEvent(e) {
    onInputChange(e.target.value);
    setInputValue(e.target.value);
    setShowSuggestions(true);
  }
  function handleReset() {
    setInputValue("");
    router.reload();
  }
  function handleSearch() {
    setShowSuggestions(false);
    onClickEvent(inputValue);
  }

  return (
    <StyledContainer>
      <div>
        <StyledSearchbar
          placeholder="Search for titles or hashtags"
          value={inputValue}
          onChange={handleChangeEvent}
        />
        <StyledButton onClick={handleSearch}>Search</StyledButton>
        <StyledButton onClick={handleReset}>reset</StyledButton>
      </div>
      <ul>
        {showSuggestions &&
          suggestions.map(({ item }, index) => (
            <StyledListItem key={index}>
              <StyledLink href={"/ideaDetails/" + item.id}>
                {item.title}
              </StyledLink>
            </StyledListItem>
          ))}
      </ul>
    </StyledContainer>
  );
}
