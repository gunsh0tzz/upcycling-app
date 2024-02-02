import Image from "next/image";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const CardContainer = styled.article`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #fafafa;
  box-shadow: 0 0 0.5rem #7d7d7d;
  border-radius: 0.5rem;
  height: 55vh;
`;

const StyledImage = styled(Image)`
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

const TextContainer = styled.div`
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  flex: 1;
`;

const Hashtags = styled.ul`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  list-style-type: none;
  color: gray;
`;

const FavoriteButton = styled.button`
  border: none;

  background-color: #fafafa;
  padding: 0.25rem;
  border-radius: 0.5rem;
  box-shadow: 0.1rem 0.1rem 0.5rem black;

  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: red;
  font-size: 1.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  /* position: sticky;
  bottom: 1rem;

  &:hover {
    text-decoration: underline;
  } */
`;

export default function Card({
  image,
  title,
  hashtags,
  favouriteIdeas,
  onToggleFavourites,
  id,
}) {
  const { data: session } = useSession();
  const isFavourite = favouriteIdeas && favouriteIdeas.includes(id);

  return (
    <StyledLink href={`/ideaDetails/${id}`}>
      <CardContainer>
        {session && (
          <FavoriteButton
            onClick={(event) => event && onToggleFavourites(id, event)}
          >
            <StyledIcon icon={isFavourite ? solidHeart : regularHeart} />
          </FavoriteButton>
        )}
        <StyledImage
          src={image}
          alt={title}
          width={0}
          height={0}
          sizes={"100vw"}
          style={{ width: "100%", height: "50%" }}
        />
        <TextContainer>
          <h2>{title}</h2>
          <Hashtags>
            {hashtags.map((hashtag) => (
              <li key={uuidv4()}>#{hashtag}</li>
            ))}
          </Hashtags>
          {/* <StyledLink href={`/ideaDetails/${id}`}>See More</StyledLink> */}
        </TextContainer>
      </CardContainer>
    </StyledLink>
  );
}
