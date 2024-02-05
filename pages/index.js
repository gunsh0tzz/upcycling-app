/* eslint-disable */

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 0 3rem;

  @media screen and (min-width: 600px) {
    padding: 0 10rem;
    min-width: 42rem;
  }
`;

const StyledCount = styled.div`
  font-size: 1rem;
  display: flex;
  gap: 0.2rem;
  color: #fafafa;
  margin-bottom: -1vh;
  background-color: #a97bb5;
  border-radius: 1rem;
  width: fit-content;
  padding: 0.2rem 0.4rem 0.2rem 0.5rem;
  margin-left: 1.7rem;

  @media screen and (min-height: 800px) {
    font-size: 1.3rem;
  }
`;

const CountDiv = styled.div`
  background-color: #fafafa;
  padding: 0.1rem 0.4rem;
  border-radius: 100%;
  color: #000000;
  font-size: 0.8rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  @media screen and (min-height: 800px) {
    font-size: 1.1rem;
  }
`;

const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  list-style-type: none;
  padding: 0;
  align-self: center;
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 7rem;
`;

const CardListItem = styled.li`
  margin: auto;
  width: 100%;
  flex-shrink: 0;
  background-color: #fafafa;
  align-self: flex-end;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  padding: 0.7rem;
  position: relative;

  @media screen and (min-width: 600px) {
    margin-top: 2rem;
    min-height: 20rem;
  }
`;

const LinkWrapper = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const ButtonBox = styled.div`
  pointer-events: none;
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
`;

const PaginationPrevButton = styled.button`
  bottom: 30rem;
  left: 0;
  margin-top: 10px;
  background: none;
  border: 0;
`;
const PaginationNextButton = styled.button`
  bottom: 10rem;
  right: 0;
  margin-top: 10px;
  background: none;
  border: 0;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: gray;
`;

const DummyPrev = styled.div`
  pointer-events: all;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  min-height: 15rem;
  margin-top: 6rem;
  width: 2rem;
  border-top-right-radius: 0.8rem;
  border-bottom-right-radius: 1rem;
  bottom: 20vh;
  left: 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.25s;
  &:hover {
    transform: scale(1.1);
  }

  @media screen and (min-width: 600px) {
    width: 4rem;
  }
`;

const DummyNext = styled.div`
  pointer-events: all;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  min-height: 15rem;
  margin-top: 6rem;
  width: 2rem;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 0.8rem;
  bottom: 20vh;
  right: 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.25s;
  &:hover {
    transform: scale(1.1);
  }

  @media screen and (min-width: 600px) {
    width: 4rem;
  }
`;

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

  const totalPages = ideas.length;

  const paginatedIdeas = ideas.slice(currentPage - 1, currentPage);

  const fuse = new Fuse(ideas, {
    keys: ["hashtags", "title"],
    minMatchCharLength: 3,
    threshold: 0.0,
  });

  function handleClickEvent(value) {
    setSearchValue(value);
    setSearchResults(fuse.search(value));
  }
  function handleInputChange(item) {
    setSuggestions(fuse.search(item));
  }

  return (
    <Container>
      <Searchbar
        suggestions={suggestions}
        onInputChange={handleInputChange}
        searchValue={searchValue}
        onClickEvent={handleClickEvent}
        setSearchValue={setSearchValue}
      />
      {!searchValue ? (
        <StyledCount>
          <p>All ideas</p>
          <CountDiv>{ideas.length}</CountDiv>{" "}
        </StyledCount>
      ) : (
        <StyledCount>
          <p>Matching ideas</p>
          <CountDiv>{suggestions.length}</CountDiv>{" "}
        </StyledCount>
      )}

      <CardList>
        {suggestions.length > 0 && searchValue
          ? suggestions.map((suggestion) => (
              <LinkWrapper href={`/ideaDetails/${suggestion.item._id}`}>
                <CardListItem key={suggestion.item._id}>
                  <Card
                    image={suggestion.item.image}
                    cover={suggestion.item.cover}
                    title={suggestion.item.title}
                    hashtags={suggestion.item.hashtags}
                    onToggleFavourites={onToggleFavourites}
                    favouriteIdeas={favouriteIdeas}
                    id={suggestion.item._id}
                  />
                </CardListItem>
              </LinkWrapper>
            ))
          : ""}
        {searchValue && suggestions.length === 0 ? (
          <h3>No matches found.</h3>
        ) : (
          ""
        )}
        {searchValue
          ? ""
          : paginatedIdeas.map((idea) => (
              <LinkWrapper href={`/ideaDetails/${idea._id}`}>
                <CardListItem key={idea._id}>
                  <Card
                    image={idea.image}
                    cover={idea.cover}
                    title={idea.title}
                    hashtags={idea.hashtags}
                    onToggleFavourites={onToggleFavourites}
                    favouriteIdeas={favouriteIdeas}
                    id={idea._id}
                    idea={idea}
                  />
                </CardListItem>
              </LinkWrapper>
            ))}
      </CardList>

      {!searchValue && (
        <ButtonBox>
          <PaginationPrevButton
            onClick={() => setCurrentPage(currentPage - 1)}
            style={{ visibility: currentPage > 1 ? "visible" : "hidden" }}
          >
            <DummyPrev>
              <StyledIcon icon={faChevronLeft} />
            </DummyPrev>
          </PaginationPrevButton>
          <PaginationNextButton
            onClick={() => setCurrentPage(currentPage + 1)}
            style={{
              visibility: currentPage < totalPages ? "visible" : "hidden",
            }}
          >
            <DummyNext>
              <StyledIcon icon={faChevronRight} />
            </DummyNext>
          </PaginationNextButton>
        </ButtonBox>
      )}
    </Container>
  );
}
