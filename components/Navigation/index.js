import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">home</Link>{" "}
          <Link href="/create">create</Link>{" "}
          
        </li>{" "}
      </ul>
    </nav>
  );
}
