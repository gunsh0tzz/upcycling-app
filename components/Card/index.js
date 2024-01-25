import Image from "next/image";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: center;
  position: relative;
`;

const StyledImage = styled(Image)`
  border-radius: 0.5rem;
`;

const Title = styled.h2`
  font-size: 1.05rem;
  padding-left: 0.5rem;
`;

const Hashtags = styled.ul`
  display: flex;
  color: #7d7d7d;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 0.9rem;
  list-style-type: none;
`;

const FavoriteButton = styled.button`
  border: none;
  background-color: transparent;
  align-self: flex-end;

  @media (max-width: 600px) {
    position: static;
    top: auto;
    right: auto;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: green;
  font-size: 2rem;
`;

export default function Card({
  image,
  title,
  hashtags,
  favouriteIdeas,
  onToggleFavourites,
  id,
}) {
  const isFavourite = favouriteIdeas && favouriteIdeas.includes(id);

  return (
    <Article>
      <StyledImage src={image} alt={title} width={200} height={145} />
      <Title>{title}</Title>
      <Hashtags>
        {hashtags.map((hashtag) => (
          <li key={uuidv4()}>#{hashtag}</li>
        ))}
      </Hashtags>
      {/* <FavoriteButton
        onClick={(event) => event && onToggleFavourites(id, event)}
      >
        <StyledIcon icon={isFavourite ? solidHeart : regularHeart} />
      </FavoriteButton> */}
      <FavoriteButton
        onClick={(event) => event && onToggleFavourites(id, event)}
      >
        {isFavourite ? (
          <Image
            src={"/plant_fav.svg"}
            width={50}
            height={50}
            alt="plant icon"
          />
        ) : (
          <Image src={"/plant.svg"} width={50} height={50} alt="plant icon" />
        )}
      </FavoriteButton>
    </Article>
  );
}
