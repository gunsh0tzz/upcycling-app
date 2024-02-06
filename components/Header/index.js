import styled from "styled-components";
import Image from "next/image";
import AuthButton from "../AuthButton/AuthButton";
import ProfileButton from "../ProfileButton";
import Link from "next/link";

const StyledHeader = styled.header`
  padding: 2vh 4vh;
  text-align: center;
  position: sticky;
  top: 0;
  height: 17vh;
  z-index: 1;
  background-color: white;
  width: 672px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 672px) {
    width: 100%;
  }
`;

const StyledImage = styled(Image)`
  @media screen and (min-width: 1240px) {
    width: 180px;
    height: 85px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AboutButton = styled(Link)`
  padding: 0.5rem;
  background-color: #44c67f;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  height: fit-content;
`;

export default function Header() {
  return (
    <StyledHeader>
      <StyledImage
        src={"/header.png"}
        width={130}
        height={60}
        alt="logo reuse"
      />
      <ButtonContainer>
        <AboutButton href="/about">About</AboutButton>
        <ProfileButton />
      </ButtonContainer>
    </StyledHeader>
  );
}
