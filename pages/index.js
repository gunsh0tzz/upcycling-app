import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Fuse from "fuse.js";
import Card from "../components/Card";
import Searchbar from "@/components/Searchbar";

const CardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  list-style-type: none;
  padding: 0;
  margin: 3rem 0rem 0rem 1rem;
  justify-content: center;
`;
const CardListItem = styled.li`
  box-sizing: border-box;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 300px;
  height: 360px;
  background-color: #fafafa;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
`;

const PaginationButton = styled.button`
  margin-top: 10px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const ideasPerPage = 4;
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
    <div>
      <Searchbar
        suggestions={suggestions}
        onInputChange={handleInputChange}
        searchValue={searchValue}
        onClickEvent={handleClickEvent}
        setSearchValue={setSearchValue}
      />
      <CardList>
        {suggestions.length > 0 && searchValue
          ? suggestions.map((suggestion) => (
              <CardListItem key={suggestion.item._id}>
                <StyledLink href={`/ideaDetails/${suggestion.item._id}`}>
                  <Card
                    image={suggestion.item.image}
                    title={suggestion.item.title}
                    hashtags={suggestion.item.hashtags}
                    onToggleFavourites={onToggleFavourites}
                    favouriteIdeas={favouriteIdeas}
                    id={suggestion.item._id}
                  />
                </StyledLink>
              </CardListItem>
            ))
          : paginatedIdeas.map((idea) => (
              <CardListItem key={idea._id}>
                {" "}
                <StyledLink href={`/ideaDetails/${idea._id}`}>
                  <Card
                    image={idea.image}
                    title={idea.title}
                    hashtags={idea.hashtags}
                    onToggleFavourites={onToggleFavourites}
                    favouriteIdeas={favouriteIdeas}
                    id={idea._id}
                    idea={idea}
                  />
                </StyledLink>
              </CardListItem>
            ))}
      </CardList>

      {!searchValue && (
        <ButtonBox>
          {currentPage > 1 ? (
            <PaginationButton onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </PaginationButton>
          ) : null}
          {currentPage < totalPages ? (
            <PaginationButton onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </PaginationButton>
          ) : null}
        </ButtonBox>
      )}
    </div>
  );
}
