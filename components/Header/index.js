import styled from "styled-components";

const StyledHeader = styled.header`
  text-align: center;

  background-color: var(--green-300);
  color: white;
  padding: 0.25rem;
  box-shadow: 0 0 0.5rem black;
`;

export default function Header() {
  return (
    <StyledHeader>
      <h1>Reuse</h1>
    </StyledHeader>
  );
}
