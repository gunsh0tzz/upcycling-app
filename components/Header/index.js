import styled from "styled-components";
import AuthButton from "../AuthButton/AuthButton";

const StyledHeader = styled.header`
  margin-bottom: 2rem;

  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
`;

export default function Header() {
  return (
    <StyledHeader>
      <h1>Reuse</h1>
      <AuthButton />
    </StyledHeader>
  );
}
