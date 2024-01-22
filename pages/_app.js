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
  const { data, mutate, error } = useSWR(
    "/api/ideas",
    { fallbackData: [] },
    fetcher
  );
  const [ideas, setIdeas] = useLocalStorageState("ideas", {
    defaultValue: data,
  });

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

  // function handleDelete({ id }) {
  //   const isConfirmed = window.confirm("Are you sure?");
  //   if (isConfirmed) {
  //     setIdeas(ideas.filter((idea) => idea.id !== id));
  //     router.push("/");
  //   }
  // }

  async function handleDelete(id) {
    const response = await fetch(`/api/ideas/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await response.json();
      mutate();
    } else {
      console.error(
        "Error deleting idea:",
        response.status,
        response.statusText
      );
    }
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
            ideas={data}
            addIdea={addIdea}
            editIdea={editIdea}
            onDelete={handleDelete}
            onToggleFavourites={handleToggleFavourites}
          />
        </SWRConfig>
      </Layout>
    </>
  );
}
