import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

import { ideas as defaultIdeas } from "@/lib/db";
import Card from "../components/Card";
import Header from "@/components/Header";

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

export default function HomePage() {
  const [ideas, setIdeas] = useState(defaultIdeas);

  return (
    <div>
      <Header />
      <CardList>
        {ideas.map((idea) => (
          <CardListItem key={idea.id}>
            <Card
              image={idea.image}
              title={idea.title}
              hashtags={idea.hashtags}
            />
            <Link href={`/ideaDetails/${idea.id}`}>See More</Link>
          </CardListItem>
        ))}
      </CardList>
      <Link href="/create">Add a new Idea</Link>
    </div>
  );
}
