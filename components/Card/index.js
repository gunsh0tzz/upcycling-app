import Image from "next/image";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  position: relative;
`;

const StyledImage = styled(Image)`
  border-radius: 0.5rem;
`;

const Hashtags = styled.ul`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  list-style-type: none;
`;

const FavoriteButton = styled.button`
  border: none;
  background-color: transparent;

  position: absolute;
  top: 0.25rem;
  right: 0.25rem;

  @media (max-width: 600px) {
    position: static;
    top: auto;
    right: auto;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: red;
  font-size: 2rem;
`;

export default function Card({
  image,
  title,
  hashtags,
  onToggleFavourites,
  id,
  isFavourite,
}) {
  return (
    <Article>
      <FavoriteButton onClick={() => onToggleFavourites({ id })}>
        {isFavourite ? (
          <StyledIcon icon={solidHeart} />
        ) : (
          <StyledIcon icon={regularHeart} />
        )}
      </FavoriteButton>
      <StyledImage src={image} alt={title} width={150} height={120} />
      <h2>{title}</h2>
      <Hashtags>
        {hashtags.map((hashtag) => (
          <li key={uuidv4()}>#{hashtag}</li>
        ))}
      </Hashtags>
    </Article>
  );
}
