import Form from "@/components/Form";
import { mutate } from "swr";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Create({ addIdea }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    return <h1>Access denied. You have to be logged in to view this page.</h1>;
  }

  async function onSubmit(data) {
    const response = await fetch("/api/ideas", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      mutate("/api/ideas");
    }

    router.push("/");
  }

  return (
    <>
      <Form onSubmit={onSubmit} />
    </>
  );
}
