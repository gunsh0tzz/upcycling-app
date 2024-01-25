import styled from "styled-components";
import Image from "next/image";

const StyledHeader = styled.header`
  margin-top: -1rem;
  margin-bottom: -4rem;
  text-align: center;
  position: relative;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Image src={"/logo.svg"} width={300} height={200} alt="logo reuse" />
    </StyledHeader>
  );
}
