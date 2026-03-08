import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; // doc:: https://react-bootstrap.netlify.app/docs/getting-started/introduction

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
