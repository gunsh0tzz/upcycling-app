import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

const SearchbarContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const StyledSearchbar = styled.input`
  background-color: #e8e8e8;
  border: none;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  padding: 0.5rem;
  flex: 6;
`;

const StyledSearchButton = styled.button`
  border: none;
  background-color: #44c67f;
  color: white;
  padding: 0.5rem;
  flex: 1;
`;

const StyledResetButton = styled.button`
  border: none;
  background-color: #3db372;
  color: white;
  padding: 0.5rem;
  flex: 1;

  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
`;

const StyledUnorderedList = styled.ul`
  position: absolute;
  top: 2rem;
  z-index: 2;
  width: 100%;
  background-color: #fafafa;
  border-left: 1px solid black;
  border-right: 1px solid black;
`;

const StyledListItem = styled.li`
  list-style: none;
  border-bottom: 1px solid black;
  width: 100%;
  padding: 0.25rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
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
    <>
      <SearchbarContainer>
        <StyledSearchbar
          placeholder="Search for titles or hashtags"
          value={inputValue}
          onChange={handleChangeEvent}
        />
        <StyledSearchButton onClick={handleSearch}>Search</StyledSearchButton>
        <StyledResetButton onClick={handleReset}>reset</StyledResetButton>
        <StyledUnorderedList>
          {showSuggestions &&
            suggestions.map(({ item }, index) => (
              <StyledListItem key={index}>
                <StyledLink href={`/ideaDetails/${item._id}`}>
                  {item.title}
                </StyledLink>
              </StyledListItem>
            ))}
        </StyledUnorderedList>
      </SearchbarContainer>
    </>
  );
}
