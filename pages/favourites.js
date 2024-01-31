import styled from "styled-components";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Card from "@/components/Card";

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

export default function FavouritePage({
  ideas,
  onToggleFavourites,
  favouriteIdeas,
}) {
  const { data: session, status } = useSession();
  const ideasToDisplay = ideas.filter((idea) =>
    favouriteIdeas.includes(idea._id)
  );

  if (status !== "authenticated") {
    return <h1>Access denied. You have to be logged in to view this page.</h1>;
  }

  return (
    <div>
      <CardList>
        {ideasToDisplay.map((idea) => (
          <CardListItem key={idea._id}>
            <Card
              image={idea.image}
              title={idea.title}
              hashtags={idea.hashtags}
              onToggleFavourites={onToggleFavourites}
              favouriteIdeas={favouriteIdeas}
              id={idea._id}
            />
            <Link href={`/ideaDetails/${idea._id}`}>See More</Link>
          </CardListItem>
        ))}
      </CardList>
    </div>
  );
}
