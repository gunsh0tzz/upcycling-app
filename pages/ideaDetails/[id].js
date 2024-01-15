import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import { ideas } from "@/lib/db";
import { useState } from "react";
import { useRouter } from "next/router.js";

const StyledArticle = styled.article`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin-top: 1rem;

  flex-direction: column;
`;

const StyledImage = styled(Image)`
  border-radius: 0.5rem;
`;

const StyledContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Instruction = styled.ol`
  padding-left: 1rem;
`;

const Hashtags = styled.ul`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Items = styled.ul`
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

const defaultIdeas = ideas;

export default function IdeaDetails() {
  const [ideas, setIdeas] = useState(defaultIdeas);
  const router = useRouter();

  const { id } = router.query;

  const ideaDetails = ideas.find((idea) => idea.id === id);

  if (!ideaDetails) {
    return <h2>Loading...</h2>;
  }

  const { instructions, items, hashtags } = ideaDetails;

  console.log(instructions);

  return (
    <>
      <Header />
      <StyledArticle>
        <h2>{ideaDetails.title}</h2>
        <StyledContainer>
          <StyledImage
            src={ideaDetails.image}
            alt={ideaDetails.title}
            width={150}
            height={120}
          />
          <Items>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </Items>
        </StyledContainer>
        <Instruction>
          {instructions.map((instruction) => (
            <li key={instruction.id}>{instruction.step}</li>
          ))}
        </Instruction>

        <Hashtags>
          {hashtags.map((hashtag, index) => (
            <li key={index}>#{hashtag}</li>
          ))}
        </Hashtags>
        <Link href="/">Go Back</Link>
      </StyledArticle>
    </>
  );
}
