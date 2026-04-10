import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { isAuthenticated } from "@/lib/authenticate";

const PUBLIC_PATHS = ["/login", "/register", "/_error", "/about"];

function isPublicPath(path) {
  if (PUBLIC_PATHS.includes(path)) {
    return true;
  }
  return false;
}

export default function RouteGuard(props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const authCheck = (url) => {
      const path = url.split("?")[0];
      console.log("RouteGuard - authCheck - path:", path);
      const authenticated = isAuthenticated();
      console.log("RouteGuard - authCheck - authenticated:", authenticated);
      if (!authenticated && !isPublicPath(path)) {
        setAuthorized(false);
        router.push("/login");
      } else {
        setAuthorized(true);
      }
    };

    console.log("RouteGuard - useEffect - router.pathname:", router.pathname);

    authCheck(router.pathname);
    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [router]);

  return <>{authorized && props.children}</>;
}
