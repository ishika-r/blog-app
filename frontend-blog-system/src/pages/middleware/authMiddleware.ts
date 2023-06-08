import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const authMiddleware = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const jwtToken = Cookies.get("access_token");
  useEffect(() => {
    if (jwtToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // if (
      //   !jwtToken &&
      //   router.pathname !== "/" &&
      //   router.pathname !== "/signup" &&
      //   router.pathname !== "/blogs" &&
      //   router.pathname !== "/categories"
      // ) {
      //   router.push("/signin");
      // }
    }
    // if (!jwtToken) {
    // }
  }, [jwtToken]);
  //   console.log("jwtToken", jwtToken);
  //   console.log("is authenticated", isAuthenticated);
  return { isAuthenticated, jwtToken };
};
