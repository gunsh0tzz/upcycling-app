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
`;

const CardListItem = styled.li`
  flex: 0 0 calc(50% - 1rem);
  max-width: calc(50% - 1rem);
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 1rem;
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
        <Image
          src={ideaDetails.image}
          alt={ideaDetails.title}
          width={150}
          height={120}
        />
        <ol>
          {instructions.map((instruction) => (
            <li key={instruction.id}>{instruction.step}</li>
          ))}
        </ol>

        <ul>
          {hashtags.map((hashtag, index) => (
            <li key={index}>#{hashtag}</li>
          ))}
        </ul>
      </StyledArticle>
      <Link href="/">Go Back</Link>
    </>
  );
}
