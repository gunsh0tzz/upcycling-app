import { useRouter } from "next/router";
import Form from "@/components/Form";
import Header from "@/components/Header";

import { useEffect, useState } from "react";
import useSWR from "swr";

export default function EditIdeas({ ideas, editIdea }) {
  const router = useRouter();
  const { id } = router.query;
  const ideaToEdit = ideas.find((idea) => idea.id === id);

  function handleEdit(updatedIdea) {
    editIdea(updatedIdea);
    router.push("/");
  }

  return (
    <>
      <Form idea={ideaToEdit} onSubmit={handleEdit} />
    </>
  );
}
