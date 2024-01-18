import Head from "next/head.js";
import styled from "styled-components";

import Header from "./Header";
import Navigation from "./Navigation";

const StyledMain = styled.main`
  margin: 0 2rem;
`;

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Reuse</title>
      </Head>
      <Header />
      <StyledMain>{children}</StyledMain>
      <Navigation />
    </>
  );
}
