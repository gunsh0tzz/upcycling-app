import Image from "next/image";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const StyledImage = styled(Image)`
  border-radius: 0.8rem;
  width: 100%;
  min-height: 12rem;
  object-fit: cover;
`;

const Title = styled.h2`
  font-size: 1.05rem;
  padding-left: 0.5rem;
  align-self: flex-start;
  width: 75%;
`;

const Hashtags = styled.ul`
  display: flex;
  color: #7d7d7d;
  gap: 0.2rem;
  flex-wrap: wrap;
  font-size: 0.9rem;
  list-style-type: none;
  max-width: 83%;
  align-self: flex-start;
  padding-left: 0.2rem;
`;

const FavoriteButton = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  top: 12rem;
  right: 0.9rem;

  transition: transform 0.25s;
  &:hover {
    transform: scale(1.1);
  }
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  position: relative;
  height: 100%;
  @media (min-width: 600px) {
    gap: 0.5rem;
    margin-top: 0rem;
  }
`;

export default function Card({
  image,
  title,
  hashtags,
  favouriteIdeas,
  onToggleFavourites,
  cover,
  id,
}) {
  const { data: session } = useSession();
  const isFavourite = favouriteIdeas && favouriteIdeas.includes(id);

  const limitedHashtags = hashtags.slice(0, 3);

  return (
    <Article>
      <StyledImage src={image ? image : cover.url} alt={title} width={200} height={160} />

      <Title>{title}</Title>
      {session && (
        <FavoriteButton
        onClick={(event) => event && onToggleFavourites(id, event)}
        >
          {isFavourite ? (
            <Image
              src={"/plant_fav.svg"}
              width={40}
              height={40}
              alt="plant icon"
            />
          ) : (
            <Image src={"/plant.svg"} width={40} height={40} alt="plant icon" />
          )}
        </FavoriteButton>
      )}
      <Hashtags>
        {limitedHashtags.map((hashtag) => (
          <li key={uuidv4()}>#{hashtag}</li>
        ))}
      </Hashtags>
    </Article>
  );
}
