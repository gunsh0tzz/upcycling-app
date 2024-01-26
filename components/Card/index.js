import Image from "next/image";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: center;
  position: relative;
  height: 100%;
`;

const StyledImage = styled(Image)`
  border-radius: 0.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  align-self: flex-start;
  color: #7d7d7d;
  &:hover {
    text-decoration: underline;
  }
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
  position: absolute;
  bottom: 0rem;
  right: 0rem;
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
  // Begrenze die Anzahl der Hashtags auf die ersten drei
  const limitedHashtags = hashtags.slice(0, 3);

  return (
    <Article>
      <StyledImage src={image} alt={title} width={200} height={145} />
      <Title>{title}</Title>
      <Hashtags>
        {limitedHashtags.map((hashtag) => (
          <li key={uuidv4()}>#{hashtag}</li>
        ))}
      </Hashtags>
      <StyledLink href={`/ideaDetails/${id}`}>See More</StyledLink>
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
