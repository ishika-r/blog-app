import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import CategoriesListing from "./CategoriesListing";
import AllBlogs from "./AllBlogs";
import Search from "../components/Search";
import { useSelector } from "react-redux";
const index = () => {
  const searchData = useSelector((state: any) => state.searchBlogApi.data);
  const [query, setQuery] = useState("");
  return (
    <div className="container">
      {/* <div className="filter-blog-div">All Blogs</div> */}

      <div className="row">
        <div className="col-md-8">
          <AllBlogs />
        </div>
        <div className="col-md-4 border-start">
          <CategoriesListing />
        </div>
      </div>
    </div>
  );
};

export default index;
