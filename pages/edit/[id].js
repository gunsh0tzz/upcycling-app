import { useRouter } from "next/router";
import Form from "@/components/Form";
import Header from "@/components/Header";

import { useEffect, useState } from "react";
import useSWR from "swr";

export default function EditIdeas({ ideas }) {
  const router = useRouter();
  const { id } = router.query;
  const ideaToEdit = ideas.find((idea) => idea.id === id);

  function handleEdit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onEdit(updatedIdeas, id);
    router.push(`/${id}`);
  }

  function prepareFormData(data) {
    const updatedIdeas = {
      id: id,
      title: data.title,
      image: data.image,
    };
    router.push(`/${id}`);
  }

  return (
    <>
      <Header />
      <Form idea={ideaToEdit} onSubmit={handleEdit} isEdit={true} />
    </>
  );
}
