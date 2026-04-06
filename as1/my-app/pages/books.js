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
import { Container, Pagination, Table } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Books() {
  console.log("Books page rendered");
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  const router = useRouter();

  // used from assigment document hints
  let queryString = { ...router.query };
  let qParts = [];

  Object.entries(queryString).forEach(([key, value]) => {
    qParts.push(`${key}:${value}`);
  });

  if (qParts.length > 0) {
    queryString = qParts.join(" AND ");
  }

  const { data, error, isLoading } = useSWR(
    `https://openlibrary.org/search.json?q=${queryString}&page=${page}&limit=10`
  );

  const subtext = Object.entries(router.query)
    .map(([key, value]) => `${key.toUpperCase()}  =  ${value}`)
    .join(" , ");

  // ---- till here

  if (isLoading) {
    <p>loading .... </p>;
  }

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
    return <p>Error While loading data</p>;
  }

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <PageHeader text="Search Results" subtext={subtext} />

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
    </Container>
  );
}
