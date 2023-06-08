import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchBlog } from "../features/dashboard/searchBlogApiSlice";

const Search = ({ query, handlequeryChange }: any) => {
  console.log("query from search", query);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchBlog(query));
  }, [query]);
  // console.log("query", query);
  return (
    <div className="search-div">
      <input
        type="text"
        name="search"
        value={query}
        className="form-control"
        placeholder="search blogs using title, content, category..."
        onChange={handlequeryChange}
      />
      <hr />
    </div>
  );
};

export default Search;
