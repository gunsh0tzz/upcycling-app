import Image from "next/image";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import AccessDeniedMessage from "@/lib/AccessDeniedMessage";
import AuthButton from "@/components/AuthButton/AuthButton";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  margin-top: 1rem;
  text-align: center;
`;

const StyledImage = styled(Image)`
  border-radius: 100%;
  border: 0rem solid black;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return <AccessDeniedMessage />;
  }

  return (
    <StyledContainer>
      <StyledImage
        src={session.user.image}
        alt="Avatar"
        width={192}
        height={192}
      />
      <h1>{session.user.name}</h1>
      <p>{session.user.email}</p>
      <AuthButton />
    </StyledContainer>
  );
}
