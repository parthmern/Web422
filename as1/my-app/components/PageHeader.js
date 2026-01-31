import Card from "react-bootstrap/Card";

// can do with prop aswell
export default function PageHeader({ text }) {
  return (
    <>
      <Card className="bg-light">
        <Card.Body>{text}</Card.Body>
      </Card>

      <br />
    </>
  );
}
