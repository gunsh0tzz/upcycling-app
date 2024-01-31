import Image from "next/image";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: center;
  position: relative;
  height: 100%;
  padding-bottom: 1rem;
`;

const StyledImage = styled(Image)`
  border-radius: 0.5rem;
  height: 70%;
  width: 100%;
`;

const Hashtags = styled.ul`
  display: flex;
  gap: 0.2rem;
  flex-wrap: wrap;
  list-style-type: none;
  width: 90%;
  max-height: 20px;
  margin-left: -1.8rem;
  font-size: 0.9rem;
  color: #7d7d7d;
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

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: red;
  font-size: 2rem;
`;
const Title = styled.h3`
  width: 90%;
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
      <StyledImage src={image} alt={title} width={150} height={120} />
      <Container>
        <Title>{title}</Title>
        <FavoriteButton
          onClick={(event) => event && onToggleFavourites(id, event)}
        >
          <StyledIcon icon={isFavourite ? solidHeart : regularHeart} />
        </FavoriteButton>
      </Container>
      <Hashtags>
        {hashtags.map((hashtag) => (
          <li key={uuidv4()}>#{hashtag}</li>
        ))}
      </Hashtags>
    </Article>
  );
}
