import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledButton = styled.button`
  padding: 0.5rem;

  border-radius: 0.25rem;
  border: none;

  background-color: #ca92de;
  color: white;
`;

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <StyledContainer>
        <p>{session.user.name}</p>
        <StyledButton onClick={() => signOut()}>
          <FontAwesomeIcon icon={faDoorOpen} />
        </StyledButton>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <p>Not signed in</p>
      <StyledButton onClick={() => signIn()}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </StyledButton>
    </StyledContainer>
  );
}
