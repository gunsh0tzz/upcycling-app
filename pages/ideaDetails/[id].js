import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import { useSession } from "next-auth/react";
/* import LoadingAnimation from "@/components/LoadingAnimation";
import { useEffect, useState } from "react";

*/
const StyledArticle = styled.article`
  display: flex;
  flex-wrap: wrap;
  max-height: 470px;
  gap: 1rem;
  list-style: none;
  padding: 1rem;
  margin: 0 2rem;
  flex-direction: column;
  background-color: #fafafa;
  border-radius: 1rem;
  max-width: 100%;
  margin-bottom: 8rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  @media screen and (min-width: 601px) {
    margin-top: 6vh;
  }
  @media screen and (min-height: 1000px) {
    margin-top: 16vh;
  }
`;

const StyledImage = styled(Image)`
  border-radius: 0.5rem;
  object-fit: cover;
`;

const StyledContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Instruction = styled.ol`
  overflow-y: scroll;
  max-height: 7rem;
  list-style-position: inside;
  font-size: 0.9rem;
`;

const Hashtags = styled.ul`
  color: #7d7d7d;
  list-style: none;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 0.8rem;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Items = styled.ul`
  list-style: none;
  font-size: 0.8rem;
  padding: 0.5rem;
`;

const ItemsTitle = styled.h3`
  padding-left: 0.5rem;
  font-weight: bolder;
  font-size: 1rem;
`;

const InstructionsTitle = styled.h3`
  display: block;
  font-weight: bolder;
  font-size: 1rem;
`;

const StyledButton = styled.button`
  width: fit-content;
  padding-top: 0.5rem;
  background: transparent;
  border: none;
  margin: -0.5rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledEditImage = styled(Image)`
  margin-top: 0.6rem;
  margin-right: 0.2rem;
`;

export default function IdeaDetails() {
  const { data: session } = useSession();
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data, isLoading, error, mutate } = useSWR(
    id ? `/api/ideas/${id}` : null
  );
  // const [showLoader, setShowLoader] = useState(true);

  if (error) return console.error(error);

  /* 
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 800);
    return () => clearTimeout(timer);
  });
  */

  if (!isReady || isLoading) {
    return <h2>Loading...</h2>;
  }

  const { instructions, items, hashtags, title, image, cover } = data;

  async function handleDelete(id) {
    const isConfirmed = window.confirm("Are you sure?");
    if (isConfirmed) {
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
  }

  return (
    <>
      <StyledArticle>
        <h3>{title}</h3>
        <StyledContainer>
          <StyledImage
            src={image ? image : cover.url}
            alt={title}
            width={150}
            height={120}
          />
          <ItemsContainer>
            <ItemsTitle>Items:</ItemsTitle>
            <Items>
              {items.map((item) => (
                <li key={uuidv4()}>{item}</li>
              ))}
            </Items>
          </ItemsContainer>
        </StyledContainer>

        <InstructionsTitle>Instructions:</InstructionsTitle>
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
        <ButtonBox>
          {session && (
            <>
              <StyledButton
                onClick={() => handleDelete(data._id)}
                aria-label="Delete Button"
              >
                <Image
                  src={"/recycling.svg"}
                  width={40}
                  height={40}
                  alt="Delete Icon"
                />
              </StyledButton>
              <Link href={`/edit/${data._id}`}>
                <StyledEditImage
                  src={"/pencil.svg"}
                  width={28}
                  height={27}
                  alt="Edit Icon"
                />
              </Link>
            </>
          )}
        </ButtonBox>
      </StyledArticle>
    </>
  );
}
