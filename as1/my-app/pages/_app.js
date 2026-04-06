import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "@/components/Layout";
import RouteGuard from "@/components/RouteGuard";
import { SWRConfig } from "swr";
import { getToken } from "@/lib/authenticate";

const fetcher = async (url) => {
  const token = getToken();
  const headers = {
    "content-type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `JWT ${token}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }
  return response.json();
};

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <RouteGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </SWRConfig>
  );
}
