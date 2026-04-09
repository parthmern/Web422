import { Modal, Button, Carousel, Badge } from "react-bootstrap";
import Image from "next/image";

export default function ProductModal({ product, show, onClose }) {
  if (!product) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <Carousel>
            {product.images.map((image, index) => (
              <Carousel.Item key={index}>
                <div style={{ position: "relative", height: "400px" }}>
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
          {product.discountPercentage && (
            <span className="text-success">
              {" "}
              (Discount: {product.discountPercentage}%)
            </span>
          )}
        </p>
        <p>
          <strong>Stock:</strong> {product.stock}
        </p>
        <p>
          <strong>Rating:</strong> {product.rating}
        </p>
        <p>
          <strong>Brand:</strong> {product.brand}
        </p>
        <p>
          <strong>Category:</strong>{" "}
          <Badge bg="secondary">{product.category}</Badge>
        </p>
        {product.reviews && product.reviews.length > 0 && (
          <div>
            <h5>Reviews:</h5>
            {product.reviews.map((review, index) => (
              <div key={index} className="border p-2 mb-2">
                <strong>{review.reviewerName}</strong> ({review.rating} )
                <p>{review.comment}</p>
                <small>{new Date(review.date).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
