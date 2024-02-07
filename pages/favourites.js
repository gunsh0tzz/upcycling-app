/* eslint-disable */

import styled from "styled-components";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Card from "@/components/Card";
import AccessDeniedMessage from "@/lib/AccessDeniedMessage";

const CardListContainer = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  list-style-type: none;
  padding: 0;
  align-self: center;
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 8rem;
`;

const CardList = styled.ul`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  min-height: 300px;
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
  const { status } = useSession();
  const ideasToDisplay = ideas.filter((idea) =>
    favouriteIdeas.includes(idea._id)
  );

  if (status !== "authenticated") {
    return <AccessDeniedMessage />;
  }

  return (
    <div>
      <CardListContainer>
        <CardList>
          {ideasToDisplay.map((idea) => (
            <LinkWrapper
              href={`/ideaDetails/${idea._id}`}
              aria-label={`Link to ${idea.title}`}
            >
              <CardListItem key={idea._id}>
                <Card
                  image={idea.image}
                  cover={idea.cover}
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
