import Link from "next/link";

export default function C404() {
  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <h2>404 - Page Not Found Page</h2>

      <Link
        style={{
          color: "#0070f3",
          textDecoration: "underline",
          fontWeight: "bold",
        }}
        href="/"
      >
        Click here to Back to Home
      </Link>
    </div>
  );
}
