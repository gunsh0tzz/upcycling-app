import Head from "next/head.js";
import styled from "styled-components";
import Header from "./Header";
import Navigation from "./Navigation";

const StyledMain = styled.main`
  position: relative;
  flex: 1;
  margin: 0;
  max-width: 42rem;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledBackgroundContainer = styled.div`
  width: 100%;
  min-height: 32rem;

  background-image: url("/cover_green.svg");
  background-size: cover;
  background-color: #ffffff;
  background-attachment: fixed;
  @media screen and (min-width: 42rem) {
    background-image: url("/Desktop_Background.svg");
  }
`;

export default function Layout({ children }) {
  return (
    <StyledContainer>
      <Head>
        <title>Reuse</title>
      </Head>
      <Header />
      <StyledMain>
        <StyledBackgroundContainer>{children}</StyledBackgroundContainer>
      </StyledMain>
      <Navigation />
    </StyledContainer>
  );
}
