import Link from "next/link";
import { authMiddleware } from "../middleware/authMiddleware";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Navbar = () => {
  const auth = authMiddleware();
  const router = useRouter();
  const isAuth = auth.isAuthenticated;
  // const jwtToken = Cookies.get("access_token");
  // console.log("is authenticated  from navbar", isAuth);
  // Logout functionality
  const handleLogout = () => {
    Cookies.remove("access_token");
    // router.forward();
  };
  console.log(isAuth);
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bolder" href="/">
          Blog App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="nav">
            <li className="nav-item">
              <Link
                href="/"
                className={
                  router.pathname === "/" ? "active nav-link" : "nav-link"
                }
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/blogs"
                className={
                  router.pathname === "/blogs" ? "active nav-link" : "nav-link"
                }
              >
                Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/categories"
                className={
                  router.pathname === "/categories"
                    ? "active nav-link"
                    : "nav-link"
                }
              >
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/bloggers"
                className={
                  router.pathname === "/bloggers"
                    ? "active nav-link"
                    : "nav-link"
                }
              >
                Bloggers
              </Link>
            </li>
            {isAuth ? (
              <>
                <li className="nav-item">
                  <Link
                    href="/dashboard"
                    className={
                      router.pathname === "/dashboard"
                        ? "active nav-link"
                        : "nav-link"
                    }
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/signin"
                    className="nav-link"
                    onClick={handleLogout}
                  >
                    SignOut
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    href="/signup"
                    className={
                      router.pathname === "/signup"
                        ? "active nav-link"
                        : "nav-link"
                    }
                  >
                    SignUp
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/signin"
                    className={
                      router.pathname === "/signin"
                        ? "active nav-link"
                        : "nav-link"
                    }
                  >
                    SignIn
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
