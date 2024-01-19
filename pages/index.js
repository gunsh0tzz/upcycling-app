import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import Fuse from "fuse.js";

import Card from "../components/Card";
import Searchbar from "@/components/Searchbar";

import { ideas as defaultIdeas } from "@/lib/db";

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

export default function HomePage({
  ideas,
  onToggleFavourites,
  favouriteIdeas,
}) {
  const [suggestions, setSuggestions] = useState([]);

  const fuse = new Fuse(defaultIdeas, {
    keys: ["hashtags", "title"],
  });

  function handleInputChange(item) {
    setSuggestions(fuse.search(item));
  }

  return (
    <div>
      <Searchbar suggestions={suggestions} onInputChange={handleInputChange} />
      <CardList>
        {suggestions.length > 0
          ? suggestions.map((suggestion) => (
              <CardListItem key={suggestion.item.id}>
                <Card
                  image={suggestion.item.image}
                  title={suggestion.item.title}
                  hashtags={suggestion.item.hashtags}
                  onToggleFavourites={onToggleFavourites}
                  isFavourite={suggestion.item.isFavourite}
                  id={suggestion.item.id}
                />
                <StyledLink href={`/ideaDetails/${suggestion.item.id}`}>
                  See More
                </StyledLink>
              </CardListItem>
            ))
          : ideas.map((idea) => (
              <CardListItem key={idea.id}>
                <Card
                  image={idea.image}
                  title={idea.title}
                  hashtags={idea.hashtags}
                  onToggleFavourites={onToggleFavourites}
                  isFavourite={idea.isFavourite}
                  id={idea.id}
                />
                <StyledLink href={`/ideaDetails/${idea.id}`}>
                  See More
                </StyledLink>
              </CardListItem>
            ))}
      </CardList>
    </div>
  );
}
