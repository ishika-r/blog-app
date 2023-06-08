import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jwt from "jsonwebtoken";

const Sidebar = () => {
  const [id, setId] = useState(null);

  useEffect(() => {
    const jwtToken: any = Cookies.get("access_token");
    const decodedToken: any = jwtToken ? jwt.decode(jwtToken) : null;
    const userId = decodedToken ? decodedToken.userId : null;
    setId(userId);
  }, []);
  return (
    <aside className="sidebar-menu  ">
      <ul className="nav flex-column">
        <li className="nav-item-sidebar">
          <Link href="/dashboard" className="nav-link text-dark">
            Dashboard
          </Link>
        </li>
        <li className="nav-item-sidebar">
          <Link
            href={`/dashboard/${id}`}
            as={`/dashboard/${id}`}
            passHref // as="/dashboard/1"
            className="nav-link text-dark"
          >
            Profile
          </Link>
        </li>
        <li className="nav-item-sidebar ">
          <Link href="/dashboard/addBlog" className="nav-link text-dark">
            Add Blog
          </Link>
        </li>
        <li className="nav-item-sidebar ">
          <Link
            href={`/dashboard/allBlogs/${id}`}
            as={`/dashboard/allBlogs/${id}`}
            passHref
            className="nav-link text-dark"
          >
            All Blogs
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
