import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faSignsPost } from "@fortawesome/free-solid-svg-icons";

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
  position: relative;
  z-index: 1;
  position: relative;
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
  color: white;
  font-size: 2rem;
  padding: 0.5rem;
  position: absolute;
  bottom: 0;
  right: 0;
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

const AboutButton = styled(Link)`
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  height: fit-content;
  position: absolute;
  bottom: 0.25rem;
  left: 0.5rem;
  font-size: 2rem;

  transition: transform 0.25s;
  &:hover {
    transform: scale(1.125);
  }
`;

const CustomerJourneyButton = styled(Link)`
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  height: fit-content;
  position: absolute;
  bottom: 0.25rem;
  right: 0.5rem;
  font-size: 2rem;
  transition: transform 0.25s;
  &:hover {
    transform: scale(1.125);
  }
`;

export default function Navigation() {
  const { data: session } = useSession();

  if (session) {
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
                  alt="Home Icon"
                />
              </StyledLink>
            </StyledListItem>
            <StyledListItem>
              <StyledCreateLink href="/create">
                <Image
                  src={"/add_circle.svg"}
                  width={60}
                  height={60}
                  alt="Create Icon"
                />
              </StyledCreateLink>
            </StyledListItem>
            <StyledListItem>
              <StyledLink href="/favourites">
                <StyledImage
                  src={"/white_plant.svg"}
                  width={60}
                  height={60}
                  alt="Favorites Icon"
                />
              </StyledLink>
            </StyledListItem>
          </StyledUnorderedList>
          <AboutButton href="/about">
            <FontAwesomeIcon icon={faCircleInfo} />
          </AboutButton>
          <CustomerJourneyButton href="/filteredTour">
            <FontAwesomeIcon icon={faSignsPost} />
          </CustomerJourneyButton>
        </StyledNavigation>
      </StyledNavigationWrapper>
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
                alt="Home Icon"
              />
            </StyledLink>
          </StyledListItem>
        </StyledUnorderedList>
        <AboutButton href="/about">
          <FontAwesomeIcon icon={faCircleInfo} />
        </AboutButton>
        <CustomerJourneyButton href="/filteredTour">
          <FontAwesomeIcon icon={faSignsPost} />
        </CustomerJourneyButton>
      </StyledNavigation>
    </StyledNavigationWrapper>
  );
}
