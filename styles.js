import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: system-ui;
    margin: 1rem 0rem 0rem 1rem;
  }

  header {
    margin-bottom: 2rem;
  }

  ul {
    list-style-type: none;
  }

  h1 {
    text-align: center;
  }
`;
