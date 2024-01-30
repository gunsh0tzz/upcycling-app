import styled from "styled-components";
import Image from "next/image";

const StyledHeader = styled.header`
  padding: 2vh;
  text-align: center;
  position: relative;
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
    </StyledHeader>
  );
}
