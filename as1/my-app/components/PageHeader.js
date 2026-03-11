import Card from "react-bootstrap/Card";

// can do with prop aswell
// https://react-bootstrap.netlify.app/docs/components/cards/
export default function PageHeader({ text, subtext }) {
  return (
    <>
      <Card
        border="success"
        className="shadow-sm"
        style={{ width: "18rem", borderWidth: "2px", borderRadius: "0.75rem" }}
      >
        <Card.Body className="p-4">
          <Card.Title
            className="fw-bold mb-2"
            style={{ letterSpacing: "-0.01em" }}
          >
            {text}
          </Card.Title>
          {subtext && (
            <Card.Text
              className="text-muted mb-0"
              style={{ fontSize: "0.9rem", lineHeight: 1.6 }}
            >
              {subtext}
            </Card.Text>
          )}
        </Card.Body>
      </Card>

      <br />
    </>
  );
}
