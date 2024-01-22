import GlobalStyle from "../styles";
import Layout from "@/components/layout";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import useLocalStorageState from "use-local-storage-state";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const router = useRouter();
  function addIdea(newIdea) {
    newIdea.id = uuidv4();
    setIdeas([newIdea, ...ideas]);
  }

  function editIdea(updatedIdea) {
    const updatedIdeas = ideas.map((idea) =>
      idea.id === updatedIdea.id ? updatedIdea : idea
    );
    setIdeas(updatedIdeas);
  }

  function handleToggleFavourites(id) {
    setIdeas(
      ideas.map((idea) =>
        idea.id === id ? { ...idea, isFavourite: !idea.isFavourite } : idea
      )
    );
  }

  return (
    <>
      <Layout>
        <GlobalStyle />
        <SWRConfig value={{ fetcher }}>
          <Component
            {...pageProps}
            addIdea={addIdea}
            editIdea={editIdea}
            onToggleFavourites={handleToggleFavourites}
          />
        </SWRConfig>
      </Layout>
    </>
  );
}
