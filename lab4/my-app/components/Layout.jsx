export default function Layout({ children }) {
  return (
    <div style={{ padding: "20px" }}>
      <header>
        <h1>My Product Store :</h1>
        <hr />
      </header>

      <main>{children}</main>
    </div>
  );
}
