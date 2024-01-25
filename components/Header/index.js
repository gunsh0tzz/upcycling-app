import styled from "styled-components";
import Image from "next/image";

const StyledHeader = styled.header`
  padding: 2vh;
  text-align: center;
  position: relative;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Image src={"/header.png"} width={130} height={60} alt="logo reuse" />
    </StyledHeader>
  );
}
