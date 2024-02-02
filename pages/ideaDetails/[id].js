import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import { useSession } from "next-auth/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const StyledArticle = styled.article`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  list-style: none;
  margin-bottom: 15vh;
  flex-direction: column;

  @media (min-width: 900px) {
    margin: 0 20vw;
  }
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
  font-weight: bold;
`;

const ItemList = styled.ul`
  background-color: white;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 50%;
`;

const ItemListEntry = styled.li`
  margin-left: 1.25rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledButton = styled.button`
  width: fit-content;
  padding: 0.75rem;
  background-color: #e8e8e8;
  border: none;
  border-radius: 0.25rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  width: fit-content;
  padding: 0.75rem;
  background-color: #e8e8e8;
  border: none;
  border-radius: 0.25rem;
`;

export default function IdeaDetails() {
  const { data: session } = useSession();
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data, isLoading, error, mutate } = useSWR(
    id ? `/api/ideas/${id}` : null
  );

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
          <StyledImage
            src={image}
            alt={title}
            width={0}
            height={0}
            sizes={"100vw"}
            style={{ width: "50%", height: "auto" }}
          />
          <ItemList>
            {items.map((item) => (
              <ItemListEntry key={uuidv4()}>{item}</ItemListEntry>
            ))}
          </ItemList>
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
        <ButtonContainer>
          <StyledLink href="/">
            <FontAwesomeIcon icon={faArrowLeft} />
          </StyledLink>
          {session && (
            <>
              <StyledLink href={`/edit/${data._id}`}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </StyledLink>
              <StyledButton onClick={() => handleDelete(data._id)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </StyledButton>
            </>
          )}
        </ButtonContainer>
      </StyledArticle>
    </>
  );
}
