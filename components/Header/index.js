import styled from "styled-components";
import Image from "next/image";
import AuthButton from "../AuthButton/AuthButton";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;
  padding: 1rem 2rem 0rem 2rem;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Image src={"/header.png"} alt={"Reuse Logo"} width={130} height={60} />
      <AuthButton />
    </StyledHeader>
  );
}
