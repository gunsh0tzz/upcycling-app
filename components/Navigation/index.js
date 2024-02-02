import Link from "next/link";
import styled from "styled-components";
import { useSession } from "next-auth/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

const StyledNavigation = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #ca92de;
`;

const StyledUnorderedList = styled.ul`
  display: flex;
  list-style: none;
`;

const StyledListItem = styled.li`
  flex: 1;
  height: 3rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 1.75rem;

  transition: font-size 0.25s;
  &:hover {
    font-size: 2rem;
  }
`;

export default function Navigation() {
  const { data: session } = useSession();

  if (session) {
    return (
      <StyledNavigation>
        <StyledUnorderedList>
          <StyledListItem>
            <StyledLink href="/">
              <StyledIcon icon={faHouse} />
            </StyledLink>
          </StyledListItem>
          <StyledListItem>
            <StyledLink href="/create">
              <StyledIcon
                icon={faPlus}
                style={{
                  transform: "translate(0,-2rem)",
                  backgroundColor: "white",
                  color: "lightgreen",
                  border: "0.5rem solid #ca92de",
                  borderRadius: "100%",
                  padding: "0.5rem",
                }}
              />
            </StyledLink>
          </StyledListItem>
          <StyledListItem>
            <StyledLink href="/favourites">
              <StyledIcon icon={faHeart} />
            </StyledLink>
          </StyledListItem>
        </StyledUnorderedList>
      </StyledNavigation>
    );
  }

  return (
    <StyledNavigation>
      <StyledUnorderedList>
        <StyledListItem>
          <StyledLink href="/">
            <StyledIcon icon={faHouse} />
          </StyledLink>
        </StyledListItem>
      </StyledUnorderedList>
    </StyledNavigation>
  );
}
