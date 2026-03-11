import PageHeader from "@/components/PageHeader";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

// using from https://react-bootstrap.netlify.app/docs/forms/validation/ to maintain bootstrap validation
// in lab 6 i used it without bootstrap
export default function Search() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      author: "",
      title: "",
      subject: "",
      language: "",
      first_publish_year: "",
    },
  });

  function submitForm(data) {
    router.push({
      pathname: "/books",
      query: Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== "")
      ),
    });
  }

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center "
    >
      <PageHeader
        text="Search for Books"
        subtext="Browse the extensive collection of books available on openlibrary.org."
      />

      <div style={{ width: "80%" }}>
        <Form onSubmit={handleSubmit(submitForm)}>
          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>

            <Form.Control
              type="text"
              className={errors.author ? "is-invalid" : ""}
              {...register("author", { required: true })}
            />

            {errors.author && (
              <Form.Control.Feedback type="invalid">
                Author is required
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control {...register("title")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control {...register("subject")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Language</Form.Label>
            <Form.Control {...register("language")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>First Publish Year</Form.Label>
            <Form.Control {...register("first_publish_year")} />
          </Form.Group>

          <Button type="submit">Search</Button>
        </Form>
      </div>
    </Container>
  );
}
