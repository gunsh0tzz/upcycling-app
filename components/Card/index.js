import Image from "next/image";
import styled from "styled-components";

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
`;

export default function Card({ image, title, hashtags }) {
  return (
    <Article>
      <StyledImage src={image} alt={title} width={150} height={120} />
      <h2>{title}</h2>
      <Hashtags>
        {hashtags.map((hashtag, index) => (
          <li key={index}>#{hashtag}</li>
        ))}
      </Hashtags>
    </Article>
  );
}
