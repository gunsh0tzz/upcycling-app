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
        <p>
          Signed in as <span aria-label={session.user.name} tabIndex="0">{session.user.name}</span>
        </p>
        <StyledButton onClick={() => signOut()} aria-label="Sign Out">
          <FontAwesomeIcon icon={faDoorOpen} />
        </StyledButton>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <p>Not signed in</p>
      <StyledButton onClick={() => signIn()} aria-label="Sign In">
        <FontAwesomeIcon icon={faRightToBracket} />
      </StyledButton>
    </StyledContainer>
  );
}