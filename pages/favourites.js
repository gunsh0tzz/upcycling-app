import styled from "styled-components";
import Link from "next/link";
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
  return (
    <div>
      <CardList>
        {ideas
          .filter((idea) => favouriteIdeas.includes(idea._id))
          .map((idea) => (
            <CardListItem key={idea._id}>
              <Card
                image={idea.image}
                title={idea.title}
                hashtags={idea.hashtags}
                onToggleFavourites={() => onToggleFavourites(idea._id)} // Pass the idea._id to onToggleFavourites
                isFavourite={true}
                id={idea._id}
              />
              <Link href={`/ideaDetails/${idea._id}`}>See More</Link>
            </CardListItem>
          ))}
      </CardList>
    </div>
  );
}
