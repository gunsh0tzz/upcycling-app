import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import {
  faMagnifyingGlass,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";

const Container = styled.div`
  position: relative;
  width: 65%;
  height: 20%;
  align-self: center;
  display: flex;

  justify-content: center;
  background-color: #fafafa;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 0.8rem;
  @media (min-width: 600px) {
    max-width: 400px;
  }
`;

const StyledSearchbar = styled.input`
  padding: 0.5rem;
  border: none;
  width: 100%;
`;

const StyledSearchButton = styled.button`
  background-color: #a97bb5;
  padding: 0.4rem;
  border-radius: 5rem;
  border: none;
`;

const StyledListItem = styled.li`
  list-style: none;

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
const StyledSearchPreview = styled.ul`
  position: absolute;
  top: 162px;
  left: 10px;
  width: 50%;
  justify-content: center;
  background-color: #fafafa;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 0.8rem;
  padding: 0.5rem;
  z-index: 1;
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

        {searchValue ? (
          <StyledSearchButton onClick={handleReset}>
            <FontAwesomeIcon icon={faArrowsRotate} />
          </StyledSearchButton>
        ) : (
          <StyledSearchButton onClick={handleSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </StyledSearchButton>
        )}
      </Container>
      <StyledSearchPreview>
        {showSuggestions &&
          suggestions.map(({ item }, index) => (
            <StyledListItem key={index}>
              <StyledLink href={`/ideaDetails/${item._id}`}>
                {item.title}
              </StyledLink>
            </StyledListItem>
          ))}
      </StyledSearchPreview>
    </>
  );
}
