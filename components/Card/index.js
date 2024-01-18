import Image from "next/image";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart } from "@fortawesome/free-solid-svg-icons";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
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

const StyledIcon = styled(FontAwesomeIcon)`
  color: black;
`;


export default function Card({ image, title, hashtags, onToggleFavourites, id, isFavourite }) {
  return (
    <Article>
      <button onClick={()=>onToggleFavourites({id})}>
      {isFavourite?<StyledIcon icon={faHeart} />:"🤍"}
      </button>
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
