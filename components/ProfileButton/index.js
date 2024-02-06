import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import AuthButton from "../AuthButton/AuthButton";

const StyledImage = styled(Image)`
  box-shadow: 0 0 0.25rem black;
  border-radius: 100%;
  border: 1px solid gray;
`;

export default function ProfileButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session) {
    return (
      <>
        <Link href="/profile">
          <StyledImage
            src={session.user.image}
            alt="Avatar"
            width={64}
            height={64}
          />
        </Link>
      </>
    );
  }

  return <AuthButton />;
}
