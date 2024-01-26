import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15rem;
  width: 70vw;
  height: 5vh;
  background-color: #eeeeee;
  padding: 0.2rem;
`;
const StyledSearchbar = styled.input`
  border: none;
  width: 60vw;
  padding: 0.4rem;
  padding-left: 1rem;
  background: transparent;
  &:focus {
    outline: none;
  }
`;
const StyledSearchButton = styled.button`
  border: none;
  border-radius: 100%;
  padding: 0.5rem;
  background-color: #a97bb5;
  transform: scale(0.9);
`;
const StyledIcon = styled(FontAwesomeIcon)`
  color: white;
`;
const StyledContainer = styled.div`
  position: absolute;
  z-index: 1;
  overflow-y: auto;
`;
const StyledPreviewSearch = styled.div`
  margin-top: 2rem;
  background-color: white;
  overflow-y: scroll;
  max-height: 5rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;
const StyledListItem = styled.li`
  list-style: none;
  white-space: nowrap;
  overflow: hidden;
  font-size: 0.8rem;
  width: 15rem;
  padding: 0.25rem;
  text-overflow: ellipsis;
  &:hover {
    background-color: rgba(0, 0, 0, 0.125);
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: grey;
  &:hover {
    text-decoration: none;
    color: black;
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
    <>
      <SearchContainer>
        <StyledSearchbar
          placeholder="Search "
          value={inputValue}
          onChange={handleChangeEvent}
        />
        {searchValue ? (
          <StyledSearchButton onClick={handleReset}>
            <StyledIcon icon={faArrowsRotate} />
          </StyledSearchButton>
        ) : (
          <StyledSearchButton onClick={handleSearch}>
            <StyledIcon icon={faMagnifyingGlass} />
          </StyledSearchButton>
        )}
      </SearchContainer>
      <StyledContainer>
        <StyledPreviewSearch>
          {showSuggestions &&
            suggestions.map(({ item }, index) => (
              <StyledListItem key={index}>
                <StyledLink href={`/ideaDetails/${item._id}`}>
                  {item.title}
                </StyledLink>
              </StyledListItem>
            ))}
        </StyledPreviewSearch>
      </StyledContainer>
    </>
  );
}
