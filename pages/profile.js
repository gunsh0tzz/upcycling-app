import Image from "next/image";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  text-align: center;
`;

const StyledImage = styled(Image)`
  border-radius: 100%;
  border: 0.25rem solid black;
`;

export default function ProfilePage() {
  return (
    <StyledContainer>
      <StyledImage src="/avatar.jpg" alt="Avatar" width={192} height={192} />
      <h1>Username</h1>
      <p>username@username.de</p>
    </StyledContainer>
  );
}
