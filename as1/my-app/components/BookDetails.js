import Image from "next/image";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
  console.log("getting workId", workId);

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  console.log("add favouritesList", favouritesList);

  const [showAdded, setShowAdded] = useState(favouritesList.includes(workId));

  async function favouritesClicked() {
    if (showAdded) {
      await removeFromFavourites(workId);
      setFavouritesList((current) => current.filter((fav) => fav != workId));
      setShowAdded(false);
    } else {
      await addToFavourites(workId);
      setFavouritesList((current) => [...current, workId]);
      setShowAdded(true);
    }
  }

  return (
    <Container>
      <Row>
        <Col lg="5">
          <Image
            src={
              book?.covers?.[0]
                ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
                : "https://placehold.co/400x600?text=Cover+Not+Available"
            }
            alt="Cover img book loading"
            width={400}
            height={600}
            onError={(event) => {
              event.target.onerror = null;
              event.target.src =
                "https://placehold.co/400x600?text=Cover+Not+Available";
            }}
          />
          <br />
          <br />
        </Col>

        <Col lg="6">
          <h3>{book?.title}</h3>

          {book?.description && <p>{book.description.value}</p>}

          <br />

          {book?.subject_people && (
            <>
              <h5>Characters</h5>
              {book.subject_people.join(", ")}
              <br />
              <br />
            </>
          )}

          {book?.subject_places && (
            <>
              <h5>Settings</h5>
              {book.subject_places.join(", ")}
              <br />
              <br />
            </>
          )}

          {book?.links && (
            <>
              <h5>More Information</h5>
              {book.links.map((link, index) => (
                <span key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                  <br />
                </span>
              ))}
            </>
          )}

          {/* do not show like if already fav */}
          {showFavouriteBtn && (
            <>
              <br />
              <Button
                variant={showAdded ? "primary" : "outline-primary"}
                onClick={favouritesClicked}
              >
                {showAdded ? "+ Favourite (added)" : "+ Favourite"}
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
