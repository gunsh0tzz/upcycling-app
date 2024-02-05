import styled from "styled-components";

const Message = styled.h3`
  margin-top: 5rem;
  padding: 0 2rem;
  text-align: center;
`;

export default function AccessDeniedMessage() {
  return (
    <Message>
      Access denied. You have to be logged in to view this page.
    </Message>
  );
}
