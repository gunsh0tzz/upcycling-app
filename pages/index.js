import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import Fuse from "fuse.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Card from "../components/Card";
import Searchbar from "@/components/Searchbar";

const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  list-style-type: none;
  padding: 0;
  align-self: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  position: absolute;
  bottom: 0;
  color: #7d7d7d;
  &:hover {
    text-decoration: underline;
  }
`;

const PaginationPrevButton = styled.button`
  position: fixed;
  bottom: 30rem;
  left: 0;
  margin-top: 10px;
`;
const PaginationNextButton = styled.button`
  position: fixed;
  bottom: 10rem;
  right: 0;
  margin-top: 10px;
`;

const ButtonBox = styled.div`
  border: 1px solid black;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: gray;
`;

const DummyPrev = styled.div`
  background-color: #fafafa;
  height: 50vh;
  width: 9vw;
  border-top-right-radius: 0.8rem;
  border-bottom-right-radius: 1rem;
  position: fixed;
  bottom: 20vh;
  left: 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform 0.25s;
  &:hover {
    transform: scale(1.1);
  }
`;

const DummyNext = styled.div`
  background-color: #fafafa;
  height: 50vh;
  width: 9vw;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 0.8rem;
  position: fixed;
  bottom: 20vh;
  right: 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform 0.25s;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledCount = styled.div`
  font-size: 1rem;
  display: flex;
  gap: 0.2rem;
  color: #fafafa;
  margin-bottom: -1vh;
  @media screen and (min-height: 800px) {
    font-size: 1.3rem;
  }
`;
const CountDiv = styled.div`
  background-color: #fafafa;
  padding: 0.1rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  border-radius: 100%;
  color: #000000;
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  @media screen and (min-height: 800px) {
    font-size: 1.1rem;
  }
`;

const CardListItem = styled.li`
  margin: auto;
  width: 63vw;
  height: 50vh;
  flex-shrink: 0;
  background-color: #fafafa;
  align-self: flex-end;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  padding: 0.7rem;
  position: relative;
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
      {!searchValue && (
        <StyledCount>
          <p>all ideas</p>
          <CountDiv>{ideas.length}</CountDiv>{" "}
        </StyledCount>
      )}

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
                <StyledLink href={`/ideaDetails/${idea._id}`}>
                  See More
                </StyledLink>
              </CardListItem>
            ))}
      </CardList>

      {!searchValue && (
        <ButtonBox>
          {currentPage > 1 ? (
            <PaginationPrevButton
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <DummyPrev>
                <StyledIcon icon={faChevronLeft} />
              </DummyPrev>
            </PaginationPrevButton>
          ) : null}
          {currentPage < totalPages ? (
            <PaginationNextButton
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <DummyNext>
                <StyledIcon icon={faChevronRight} />
              </DummyNext>
            </PaginationNextButton>
          ) : null}
        </ButtonBox>
      )}
    </>
  );
}
