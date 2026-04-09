import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Image from "next/image";
import dynamic from "next/dynamic";
import Head from "next/head";

const ProductModal = dynamic(() => import("../components/ProductModal.js"), {
  ssr: false,
});

export async function getStaticProps() {
  const res = await fetch("https://dummyjson.com/products?limit=12");
  const data = await res.json();

  return {
    props: {
      products: data.products,
    },
  };
}

export default function Home({ products }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    handleOpen();
  };

  return (
    <>
      <Head>
        <title>Product Store</title>
      </Head>
      <Container>
        <h1 className="my-4">Products Store:</h1>
        <Row>
          {products.map((product) => (
            <Col key={product.id} xs={12} md={6} lg={4} className="mb-4">
              <Card
                onClick={() => handleProductClick(product)}
                style={{ cursor: "pointer" }}
              >
                <div style={{ position: "relative", height: "200px" }}>
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>
                    <strong>Price: </strong>${product.price}
                    {product.discountPercentage && (
                      <span className="text-success">
                        {" "}
                        ({product.discountPercentage}per off)
                      </span>
                    )}
                    <br />
                    <strong>Rating = </strong>
                    {product.rating}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            show={showModal}
            onClose={handleClose}
          />
        )}
      </Container>
    </>
  );
}
