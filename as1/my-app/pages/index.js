/*********************************************************************************
 * WEB422 – Assignment 1
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: PARTH RANJITBHAI PATEL Student ID: 128823234 Date: 01-02-2026
 *
 ********************************************************************************/

import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Pagination, Table } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  const router = useRouter();

  const author = "Terry Pratchett";

  const { data, error } = useSWR(
    `https://openlibrary.org/search.json?q=author:${encodeURIComponent(
      author
    )}&page=${page}&limit=10`
  );

  console.log(data);

  useEffect(() => {
    if (data) {
      setPageData(data.docs);
    }
  }, [data]);

  const previous = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const next = () => {
    setPage(page + 1);
  };

  if (error) {
    return <p>Error Whiel loading data</p>;
  }

  return (
    <>
      <PageHeader text={`Novels by ${author}`} />

      <Table striped hover>
        <thead>
          <tr>
            <th>Title:</th>
            <th>First Published:</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((book) => (
            <tr
              key={book.key}
              onClick={() => router.push(book.key)}
              style={{ cursor: "pointer" }}
            >
              <td>{book.title}</td>
              <td>{book.first_publish_year ?? "Not specified"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
