import styled from "styled-components";
import Link from "next/link";
import Card from "@/components/Card";

const CardListContainer = styled.div`
  overflow-y: auto;
`;
const CardList = styled.ul`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  list-style-type: none;
  padding: 0;
  align-self: center;
  position: relative;
`;

const LinkWrapper = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
const CardListItem = styled.li`
  margin: auto;
  width: auto;
  max-width: 26rem;
  flex-shrink: 0;
  background-color: #fafafa;
  align-self: flex-end;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  padding: 0.7rem;
  position: relative;
  margin-bottom: 2rem;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  position: absolute;
  bottom: 0;
  color: #7d7d7d;
  &:hover {
    text-decoration: underline;
  }
  @media screen and (min-width: 601px) {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
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
      <CardListContainer>
        <CardList>
          {ideasToDisplay.map((idea) => (
            <LinkWrapper href={`/ideaDetails/${idea._id}`}>
              <CardListItem key={idea._id}>
                <Card
                  image={idea.image}
                  title={idea.title}
                  hashtags={idea.hashtags}
                  onToggleFavourites={onToggleFavourites}
                  favouriteIdeas={favouriteIdeas}
                  id={idea._id}
                />
              </CardListItem>{" "}
            </LinkWrapper>
          ))}
        </CardList>
      </CardListContainer>
    </div>
  );
}
