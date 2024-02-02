import styled from "styled-components";
import { useSession } from "next-auth/react";
import Card from "@/components/Card";

const CardList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  list-style-type: none;
  margin-bottom: 15vh;

  @media (min-width: 950px) {
    margin: 0 20vw;
  }
`;

const CardListItem = styled.li`
  flex: 0 0 calc(50% - 1rem);
  max-width: calc(50% - 1rem);
`;

export default function FavouritePage({
  ideas,
  onToggleFavourites,
  favouriteIdeas,
}) {
  const { status } = useSession();
  const ideasToDisplay = ideas.filter((idea) =>
    favouriteIdeas.includes(idea._id)
  );

  if (status !== "authenticated") {
    return <h1>Access denied. You have to be logged in to view this page.</h1>;
  }

  return (
    <>
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
          </CardListItem>
        ))}
      </CardList>
    </>
  );
}
