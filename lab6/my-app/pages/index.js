import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { usersAtom } from "../store";
import { useAtom } from "jotai"; // dpc: https://jotai.org/
import { Container, ListGroup, Button } from "react-bootstrap"; // https://getbootstrap.com/docs/5.2/layout/containers/
import Link from "next/link";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [users] = useAtom(usersAtom);

  return (
    <Container className="mt-5">
      <Container className={geistSans.className}>
        <h1 class="text-success">Current User lists</h1>
        <ListGroup className="mb-3">
          {users.map((user) => (
            <ListGroup.Item key={user.id}>
              <Link href={`/users/${user.id}`}>
                {user.name} - {user.email}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Link href="/users/add">
          <Button>Add User</Button>
        </Link>
      </Container>
    </Container>
  );
}
