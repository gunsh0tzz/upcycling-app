import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --green-100: rgba(98, 189, 105,1);
    --green-200: rgba(90, 171, 97,1);
    --green-300: rgba(53, 136, 86,1);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: system-ui;
  }
`;
