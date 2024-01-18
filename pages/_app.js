import GlobalStyle from "../styles";
import Layout from "@/components/layout";
import { ideas as defaultIdeas } from "@/lib/db";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [ideas, setIdeas] = useState(defaultIdeas);

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

  function handleDelete({ id }) {
    const isConfirmed = window.confirm("Are you sure?");
    if (isConfirmed) {
      setIdeas(ideas.filter((idea) => idea.id !== id));
      router.push("/");
    }
  }

function handleToggleFavourites({ id }) {
  setIdeas(
    ideas.map((idea) =>
      idea.id === id ? { ...idea, isFavourite: !idea.isFavourite } : idea
    )
  )}




  return (
    <>
    <Layout>
      <GlobalStyle />
      <Component
        {...pageProps}
        ideas={ideas}
        addIdea={addIdea}
        editIdea={editIdea}
        onDelete={handleDelete}
        onToggleFavourites={handleToggleFavourites}
        id={ideas.id}
        isFavourite={ideas.isFavourite}

      />
      </Layout>
    </>
  );
}
