import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";

export default function BookDetails({ book }) {
  return (
    <Container>
      <Row>
        <Col lg="6">
          {/* issue : https://nextjs.org/docs/messages/next-image-unconfigured-host */}
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
        </Col>
      </Row>
    </Container>
  );
}
