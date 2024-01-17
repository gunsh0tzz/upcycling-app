import Header from "./Header";
import Head from "next/head.js";
import Navigation from "./Navigation";

export default function Layout({ children }) {
    return (
      <>
        <Head>
          <title>Reuse</title>
        </Head>
        <Header/>
        <main>{children}</main>
        <Navigation/>
      </>
    );
  }