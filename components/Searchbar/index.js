import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

const StyledContainer = styled.div`
  position: relative;
  align-self: center;
  display: flex;
  justify-content: center;
  background-color: #FAFAFA;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 0.8rem;
  @media (min-width: 600px) {
    max-width: 400px;
  }
`;

const StyledSearchbar = styled.input`
  flex: 1;
  border: 0;
  border-radius: 0.8rem;
  padding: 0.5rem;
  padding-right: 2.5rem;
`;

const StyledSearchButton = styled.button`
  background-color: #A97BB5;
  padding: 0.4rem;
  border-radius: 5rem;
  border: none;
  width: 2rem;
  height: 2rem;
  position: absolute;
  right: -2px;
`;

const StyledListItem = styled.li`
  list-style: none;
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
  top: 102%;
  width: 100%;
  justify-content: center;
  background-color: #FAFAFA;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 0.8rem;
  padding: 0.5rem;
  z-index: 1;
`;
const MainContainer = styled.div`
  position: relative;
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
    <MainContainer>
      <StyledContainer>
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
      </StyledContainer>
      {showSuggestions && suggestions.length > 0 && (
        <StyledSearchPreview>
          {suggestions.map(({ item }, index) => (
            <StyledListItem key={index}>
              <StyledLink href={`/ideaDetails/${item._id}`}>
                {item.title}
              </StyledLink>
            </StyledListItem>
          ))}
        </StyledSearchPreview>
      )}
    </MainContainer>
  );
}