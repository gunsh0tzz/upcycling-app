import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Fuse from "fuse.js";
import Card from "../components/Card";
import Searchbar from "@/components/Searchbar";

const CardList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  list-style-type: none;
  padding: 0;
  margin: 1rem 0rem 0rem 1rem;
`;
const CardListItem = styled.li`
  flex: 0 0 calc(50% - 1rem);
  max-width: calc(50% - 1rem);
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 1rem;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;

const PaginationButton = styled.button`
  margin-top: 10px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
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
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(searchResults.length / ideasPerPage);
  const paginatedIdeas = searchResults.slice(
    (currentPage - 1) * ideasPerPage,
    currentPage * ideasPerPage
  );
  const fuse = new Fuse(ideas, {
    keys: ["hashtags", "title"],
  });

  function handleClickEvent(value) {
    setSearchValue(value);
    const results = fuse.search(value);
    const filteredResults = results.filter((result) => {
      return (
        result.item.title.toLowerCase() === value.toLowerCase() ||
        result.item.hashtags.some(
          (tag) => tag.toLowerCase() === value.toLowerCase()
        )
      );
    });
    setSearchResults(filteredResults.map((result) => result.item));
  }

  function handleInputChange(item) {
    setSuggestions(fuse.search(item));
  }

  useEffect(() => {
    if (!searchValue) {
      setSearchResults(ideas);
    }
  }, [ideas, searchValue]);

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
        {paginatedIdeas.map((idea) => (
          <CardListItem key={idea._id}>
            <Card
              image={idea.image}
              title={idea.title}
              hashtags={idea.hashtags}
              onToggleFavourites={onToggleFavourites}
              favouriteIdeas={favouriteIdeas}
              id={idea._id}
              idea={idea}
            />
            <StyledLink href={`/ideaDetails/${idea._id}`}>See More</StyledLink>
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
