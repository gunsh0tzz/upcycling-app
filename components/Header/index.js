import styled from "styled-components";
import AuthButton from "../AuthButton/AuthButton";
import Image from "next/image";

const StyledHeader = styled.header`
  margin-bottom: 2rem;
  justify-content: space-around;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  height: 13vh;
  background-color: #fafafa;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
`;

const StyledLogo = styled(Image)``;

export default function Header() {
  return (
    <StyledHeader>
      <StyledLogo
        src="/Images/header.png"
        width={125}
        height={60}
        alt="Reuse Logo"
      ></StyledLogo>
      <AuthButton />
    </StyledHeader>
  );
}
