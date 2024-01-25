import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StyledButton = styled.button`
  padding: 0.25rem;

  border-radius: 0.25rem;
  border: 1px solid black;

  background-color: white;
  color: black;
`;

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <StyledContainer>
        Signed in as {session.user.name} <br />
        <StyledButton onClick={() => signOut()}>Sign out</StyledButton>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      Not signed in <br />
      <StyledButton onClick={() => signIn()}>Sign in</StyledButton>
    </StyledContainer>
  );
}
