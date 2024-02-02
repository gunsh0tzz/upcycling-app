import styled from "styled-components";
import Image from "next/image";
import AuthButton from "../AuthButton/AuthButton";

const StyledHeader = styled.header`
  padding: 2vh;
  text-align: center;
  position: sticky;
  top: 0;
  height: 17vh;
  z-index: 1;
  background-color: white;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const StyledImage = styled(Image)`
  @media screen and (min-width: 1240px) {
    width: 180px;
    height: 85px;
  }
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
      <AuthButton />
    </StyledHeader>
  );
}
