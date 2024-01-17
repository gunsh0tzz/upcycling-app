import GlobalStyle from "../styles";
import { ideas as defaultIdeas } from "@/lib/db";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App({ Component, pageProps }) {
  const [ideas, setIdeas] = useState(defaultIdeas);
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
  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        ideas={ideas}
        addIdea={addIdea}
        editIdea={editIdea}
      />
    </>
  );
}
