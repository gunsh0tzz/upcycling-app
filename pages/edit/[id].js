import { useRouter } from "next/router";
import Form from "@/components/Form";
import Header from "@/components/Header";

import useSWR from "swr";

export default function EditIdeas({ ideas, editIdea }) {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: ideaToEdit,
    isLoading,
    mutate,
  } = useSWR(id ? `/api/ideas/${id}` : null);

  async function onEdit(data) {
    const response = await fetch(`/api/ideas/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    mutate(`/api/ideas`);
    mutate(`/api/ideas/${id}`);
    router.push("/");
  }
  if (!ideaToEdit || isLoading) {
    return "Loading";
  }

  return (
    <>
      <Form idea={ideaToEdit} onSubmit={onEdit} />
    </>
  );
}
