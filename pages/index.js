import styled from "styled-components";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Fuse from "fuse.js";
import Card from "../components/Card";
import Searchbar from "@/components/Searchbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled.div`
  @media (min-width: 950px) {
    margin: 0 20vw;
  }
`;

const CardList = styled.ul`
  list-style-type: none;
`;

const PaginationButton = styled.button`
  margin-top: 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #e8e8e8;
  padding: 0.5rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ideasPerPage = 1;
export default function HomePage({ onToggleFavourites, favouriteIdeas }) {
  const {
    data: ideas,
    isLoading,
    error,
  } = useSWR("/api/ideas", {
    fallbackData: [],
  });
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState(
    ideas.map((idea) => ({ item: idea }))
  );
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(ideas.length / ideasPerPage);
  const paginatedIdeas = ideas.slice(
    (currentPage - 1) * ideasPerPage,
    currentPage * ideasPerPage
  );
  const fuse = new Fuse(ideas, {
    keys: ["hashtags", "title"],
  });
  function handleClickEvent(value) {
    setSearchValue(value);
    setSearchResults(fuse.search(value));
  }
  function handleInputChange(item) {
    setSuggestions(fuse.search(item));
  }
  return (
    <>
      <Searchbar
        suggestions={suggestions}
        onInputChange={handleInputChange}
        searchValue={searchValue}
        onClickEvent={handleClickEvent}
        setSearchValue={setSearchValue}
      />
      <StyledContainer>
        <CardList>
          {suggestions.length > 0 && searchValue
            ? suggestions.map((suggestion) => (
                <CardListItem key={suggestion.item._id}>
                  <Card
                    image={suggestion.item.image}
                    title={suggestion.item.title}
                    hashtags={suggestion.item.hashtags}
                    onToggleFavourites={onToggleFavourites}
                    favouriteIdeas={favouriteIdeas}
                    id={suggestion.item._id}
                  />
                  <StyledLink href={`/ideaDetails/${suggestion.item._id}`}>
                    See More
                  </StyledLink>
                </CardListItem>
              ))
            : paginatedIdeas.map((idea) => (
                <li key={idea._id}>
                  <Card
                    image={idea.image}
                    title={idea.title}
                    hashtags={idea.hashtags}
                    onToggleFavourites={onToggleFavourites}
                    favouriteIdeas={favouriteIdeas}
                    id={idea._id}
                    idea={idea}
                  />
                </li>
              ))}
        </CardList>

        {!searchValue && (
          <ButtonBox>
            {currentPage > 1 ? (
              <PaginationButton onClick={() => setCurrentPage(currentPage - 1)}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </PaginationButton>
            ) : null}
            {currentPage < totalPages ? (
              <PaginationButton onClick={() => setCurrentPage(currentPage + 1)}>
                <FontAwesomeIcon icon={faArrowRight} />
              </PaginationButton>
            ) : null}
          </ButtonBox>
        )}
      </StyledContainer>
    </>
  );
}
