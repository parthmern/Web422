import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("https://fakestoreapi.com/products", fetcher);

  if (error) return <p>Error loading products...</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>All Products below</h2>

      {data.map((product) => (
        <div
          key={product.id}
          style={{
            marginBottom: "10px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "red",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link href={`/products/${product.id}`}>
            <h3 style={{ cursor: "pointer" }}>{product.title}</h3>
          </Link>

          <Link href={`/products/${product.id}`}>
            <Image
              src={product.image}
              alt={product.title}
              width={150}
              height={150}
              style={{ cursor: "pointer" }}
            />
          </Link>

          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
}
