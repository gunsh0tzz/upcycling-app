import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faRightToBracket,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledButton = styled.button`
  padding: 0.25rem;

  border-radius: 0.25rem;
  border: none;

  font-size: 1.125rem;
  background-color: #ca92de;
  color: white;

  transition: transform 0.25s;
  &:hover {
    transform: scale(1.1);
  }
`;

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <StyledContainer>
        Signed in as {session.user.name} <br />
        <StyledButton onClick={() => signOut()}>
          <FontAwesomeIcon icon={faDoorOpen} />
        </StyledButton>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      Not signed in <br />
      <StyledButton onClick={() => signIn()}>
        <FontAwesomeIcon icon={faRightToBracket} />
      </StyledButton>
    </StyledContainer>
  );
}
