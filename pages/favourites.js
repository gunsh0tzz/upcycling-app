import styled from "styled-components";
import Link from "next/link";
import Card from "@/components/Card";

const CardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  list-style-type: none;
  padding: 0;
  margin: 2rem 0rem 0rem 1rem;
  justify-content: center;
`;

const CardListItem = styled.li`
  box-sizing: border-box;
  border-radius: 0.5rem;
  margin-left: 0.7rem;
  padding: 1rem;
  width: 280px;
  height: 360px;
  background-color: #fafafa;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
`;
const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export default function FavouritePage({
  ideas,
  onToggleFavourites,
  favouriteIdeas,
}) {
  const ideasToDisplay = ideas.filter((idea) =>
    favouriteIdeas.includes(idea._id)
  );

  return (
    <div>
      <CardList>
        {ideasToDisplay.map((idea) => (
          <CardListItem key={idea._id}>
            <StyledLink href={`/ideaDetails/${idea._id}`}>
              <Card
                image={idea.image}
                title={idea.title}
                hashtags={idea.hashtags}
                onToggleFavourites={onToggleFavourites}
                favouriteIdeas={favouriteIdeas}
                id={idea._id}
              />
            </StyledLink>
          </CardListItem>
        ))}
      </CardList>
    </div>
  );
}
