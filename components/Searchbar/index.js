import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import {
  faMagnifyingGlass,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";

const StyledSearchbar = styled.input`
  border: 1px solid black;
  padding: 0.5rem;
  width: 70%;
`;

const StyledSearchButton = styled.button`
  border: 1px solid black;
  padding: 0.5rem;
  background-color: #a97bb5;
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

const Container = styled.div`
  border: 1px solid black;
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
    <>
      <Container>
        <StyledSearchbar
          placeholder="Search for titles or hashtags"
          value={inputValue}
          onChange={handleChangeEvent}
        />
        <StyledSearchButton onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </StyledSearchButton>
        <StyledSearchButton onClick={handleReset}>
          <FontAwesomeIcon icon={faArrowsRotate} />
        </StyledSearchButton>
      </Container>
      <ul>
        {showSuggestions &&
          suggestions.map(({ item }, index) => (
            <StyledListItem key={index}>
              <StyledLink href={`/ideaDetails/${item._id}`}>
                {item.title}
              </StyledLink>
            </StyledListItem>
          ))}
      </ul>
    </>
  );
}
