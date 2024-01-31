import Head from "next/head.js";
import styled from "styled-components";
import Header from "./Header";
import Navigation from "./Navigation";

const StyledMain = styled.main`
  position: relative;
  flex: 1;
  margin: 0;
  max-width: 42rem;
  //background-image: url("/cover_green.svg");
  background-image:url("/Desktop_Background.svg");

  background-size:cover;
  background-color: #FFFFFF;
  background-attachment: fixed;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;

  /* Make sure one can scroll to bottom navigation */
  padding-bottom: 7rem;

  @media screen and (min-width: 42rem){
    margin: 0 auto;
  }

`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

export default function Layout({ children }) {
  return (
    <StyledContainer>
      <Head>
        <title>Reuse</title>
      </Head>
      <Header />
      <StyledMain>{children}</StyledMain>
      <Navigation />
    </StyledContainer>
  );
}
