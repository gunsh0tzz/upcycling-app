import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faDoorOpen,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #ca92de;
  color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

  transition: transform 0.25s;
  &:hover {
    transform: scale(1.05);
  }
`;

const Icon = styled(FontAwesomeIcon)`
  border-radius: 0.5rem;
  border: none;
  font-size: 1.125rem;
  color: white;
`;

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Button aria-label="Sign Out" onClick={() => signOut()}>
        Logout
        <Icon icon={faDoorOpen} />
      </Button>
    );
  }

  return (
    <Button aria-label="Sign In" onClick={() => signIn()}>
      Login
      <Icon icon={faRightFromBracket} />
    </Button>
  );
}
