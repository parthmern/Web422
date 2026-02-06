import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(
    id ? `https://fakestoreapi.com/products/${id}` : null,
    fetcher
  );

  if (error) return <p>Error</p>;
  if (!data) return <p>Loading....</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>{data.title}</h2>

      <img src={data.image} width="200" />

      <p>
        <strong>Price:</strong> ${data.price}
      </p>
      <p>
        <strong>Category:</strong> {data.category}
      </p>
      <p>
        <strong>Description:</strong> {data.description}
      </p>
      <p>
        <strong>Rating :</strong> {data.rating.rate} ({data.rating.count}{" "}
        reviews)
      </p>

      <Link
        href="/"
        style={{
          color: "#0070f3",
          textDecoration: "underline",
          fontWeight: "bold",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
