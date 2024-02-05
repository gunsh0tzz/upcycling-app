import Form from "@/components/Form";
import { mutate } from "swr";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AccessDeniedMessage from "@/lib/AccessDeniedMessage";

export default function Create({ addIdea }) {
  const { status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    return <AccessDeniedMessage />;
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
