import PageHeader from "@/components/PageHeader";
import BookCard from "@/components/BookCard";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col } from "react-bootstrap";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (favouritesList.length === 0) {
    return (
      <PageHeader text="Nothing Here" subtext="Try adding a book to the list" />
    );
  }

  console.log("favouritesList", favouritesList);

  return (
    <>
      <PageHeader
        text="Favourites"
        subtext="All your favourite books, in one place"
      />

      <Row className="gy-4">
        {favouritesList.map((workId) => (
          <Col lg={3} md={6} key={workId}>
            <BookCard workId={workId} />
          </Col>
        ))}
      </Row>
    </>
  );
}
