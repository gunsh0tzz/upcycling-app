import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router.js";
import useSWR from "swr";

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
  list-style: none;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Items = styled.ul`
  list-style: none;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

const StyledButton = styled.button`
  width: fit-content;
  padding: 0.5rem;
`;

export default function IdeaDetails() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: idea, isLoading, error, mutate } = useSWR(`/api/ideas/${id}`);
  if (error) return console.log(error);

  if (!isReady || isLoading) return <h2>Loading...</h2>;

  const { instructions, items, hashtags, title, image } = data;

  async function handleDelete(id) {
    const response = await fetch(`/api/ideas/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await response.json();
      mutate();
      router.push("/");
    } else {
      console.error(
        "Error deleting idea:",
        response.status,
        response.statusText
      );
    }
  }

  return (
    <>
      <StyledArticle>
        <h2>{title}</h2>
        <StyledContainer>
          <StyledImage src={image} alt={title} width={150} height={120} />
          <Items>
            {items.map((item) => (
              <li key={uuidv4()}>{item}</li>
            ))}
          </Items>
        </StyledContainer>
        <Instruction>
          {instructions.map((instruction) => (
            <li key={instruction.id}>{instruction.step}</li>
          ))}
        </Instruction>

        <Hashtags>
          {hashtags.map((hashtag) => (
            <li key={uuidv4()}>#{hashtag}</li>
          ))}
        </Hashtags>
        <Link href="/">Go Back</Link>
        <Link href={`/edit/${idea._id}`}>Edit</Link>
        <StyledButton onClick={() => handleDelete(idea._id)}>
          Delete Idea
        </StyledButton>
      </StyledArticle>
    </>
  );
}
