import GlobalStyle from "../styles";
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

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        ideas={ideas}
        addIdea={addIdea}
        editIdea={editIdea}
        onDelete={handleDelete}
      />
    </>
  );
}
