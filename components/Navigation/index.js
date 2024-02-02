import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

const StyledNavigationWrapper = styled.nav`
  width: 100%;
  justify-content: center;
  background-color: #fff;
  position: fixed;
  bottom: 0;
`;

const StyledNavigation = styled.div`
  margin: auto;
  height: 100%;
  max-width: 42rem;
  background-image: url("/Rectangle.svg");
  background-size: cover;
  z-index: 1;
  @media screen and (min-width: 600px) {
    background-image: url("/Desktop_NavImage.svg");
  }
`;

const StyledUnorderedList = styled.ul`
  display: flex;
  gap: 0.2rem;
  justify-content: center;
  list-style: none;
  height: 6rem;
  @media screen and (min-width: 1024px) {
    margin-top: 0.6rem;
  }
`;

const StyledListItem = styled.li`
  display: flex;
  @media screen and (min-width: 600px) {
    margin-bottom: 1.75vh;
    padding-left: 1.2rem;
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  align-items: flex-end;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: black;
  font-size: 2rem;
`;

const StyledImage = styled(Image)`
  @media screen and (min-width: 600px) {
    transform: scale(1.2);
  }
  @media screen and (min-width: 1024px) {
    transform: scale(1.3);
  }
`;

const StyledCreateLink = styled(Link)`
  background-color: #fafafa;
  border-radius: 100%;
  padding: 0.2rem 0.3rem 0;
  align-self: flex-start;
  border: 0.1px solid lightgray;

  transition: transform 0.25s;
  &:hover {
    transform: scale(1.1);
  }
  @media screen and (min-width: 601px) {
    transform: scale(1.2);
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
              <StyledIcon icon={faPlus} />
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
    <StyledNavigationWrapper>
      <StyledNavigation>
        <StyledUnorderedList>
          <StyledListItem>
            <StyledLink href="/">
              <StyledImage
                src={"/home.svg"}
                width={60}
                height={60}
                alt="plant icon"
              />
            </StyledLink>
          </StyledListItem>
          <StyledListItem>
            <StyledCreateLink href="/create">
              <Image
                src={"/add_circle.svg"}
                width={60}
                height={60}
                alt="plant icon"
              />
            </StyledCreateLink>
          </StyledListItem>
          <StyledListItem>
            <StyledLink href="/favourites">
              <StyledImage
                src={"/white_plant.svg"}
                width={60}
                height={60}
                alt="plant icon"
              />
            </StyledLink>
          </StyledListItem>
        </StyledUnorderedList>
      </StyledNavigation>
    </StyledNavigationWrapper>
  );
}
