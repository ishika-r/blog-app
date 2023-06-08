import Layout from "@/pages/components/Layout";
import Paginate from "@/pages/components/Paginate";
import Search from "@/pages/components/Search";
import { deleteBlog } from "@/pages/features/dashboard/deleteBlogApiSlice";
import { getUserBlog } from "@/pages/features/dashboard/getUserBlogApiSlice";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { orderBy } from "lodash";
import { AiOutlineSortAscending } from "react-icons/ai";
import { AiOutlineSortDescending } from "react-icons/ai";
import { ImSortAlphaAsc } from "react-icons/im";
import { ImSortAlphaDesc } from "react-icons/im";

const allBlogs = () => {
  const router = useRouter();
  const id = router.query.id;
  const dispatch = useDispatch();
  const blog = useSelector((state: any) => state.getUserBlog.data);
  const [blogData, setBlogData]: any = useState([]);
  console.log("blog data", blogData);
  const searchData = useSelector((state: any) => state.searchBlogApi.data);
  const [query, setQuery] = useState("");
  // User is currently on this  page
  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page
  const [recordsPerPage] = useState(3);
  const [sortCriteria, setSortCriteria]: any = useState({
    column: "id", // Column name to sort
    direction: "asc", // Sorting direction ("asc" or "desc")
  });

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // const currentBlog = Array.isArray(blogData)
  //   ? blogData.slice(indexOfFirstRecord, indexOfLastRecord)
  //   : [];
  const sortedBlogData = orderBy(
    blogData,
    sortCriteria.column,
    sortCriteria.direction
  );
  const currentBlog = Array.isArray(sortedBlogData)
    ? sortedBlogData.slice(indexOfFirstRecord, indexOfLastRecord)
    : [];
  const paginate = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(blogData?.length / recordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    setCurrentPage(Math.ceil(blogData?.length / recordsPerPage));
  };

  const handlequeryChange = (e: any) => {
    setQuery(e.target.value);
    setSortCriteria({ column: "", direction: "" });
  };

  useEffect(() => {
    dispatch(getUserBlog(id));
  }, [id]);

  useEffect(() => {
    if (query) {
      setBlogData(searchData);
      setCurrentPage(1);
    } else if (blog) {
      setBlogData(blog);
    }
  }, [blog, query]);

  //   Delete Blog
  const handleDelete = (id: any) => {
    dispatch(deleteBlog(id));
    const updatedBlogData = blogData.filter((blog: any) => blog.id !== id);
    setBlogData(updatedBlogData);
  };
  const handleSort = (column: string) => {
    if (sortCriteria.column === column) {
      // If the same column is clicked again, toggle the sorting direction
      setSortCriteria({
        column,
        direction: sortCriteria.direction === "asc" ? "desc" : "asc",
      });
    } else {
      // If a different column is clicked, set the new column and default sorting direction
      setSortCriteria({ column, direction: "asc" });
    }
  };
  const renderSortIcon = (column: string) => {
    if (sortCriteria.column === column) {
      return sortCriteria.direction === "asc" ? (
        <AiOutlineSortAscending />
      ) : (
        <AiOutlineSortDescending />
      );
    }
    return <AiOutlineSortAscending />;
  };

  return (
    <Layout>
      <ToastContainer />
      <div
        className="card"
        style={{ width: "98%", marginLeft: "1%", marginTop: "1%" }}
      >
        <div className="card-body">
          <Search query={query} handlequeryChange={handlequeryChange} />

          {blogData?.length > 0 ? (
            <>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col" onClick={() => handleSort("id")}>
                      ID {renderSortIcon("id")}
                    </th>
                    <th scope="col" onClick={() => handleSort("title")}>
                      Blog Title {renderSortIcon("title")}
                    </th>
                    {/* Add other column headers with onClick handlers */}
                    <th scope="col" onClick={() => handleSort("content")}>
                      Blog Content{renderSortIcon("content")}
                    </th>
                    {/* Add other column headers with onClick handlers */}
                    {/* <th scope="col">Blog Title</th> */}
                    {/* <th scope="col">Blog Content</th> */}
                    <th scope="col" onClick={() => handleSort("category")}>
                      Blog Category{renderSortIcon("category")}
                    </th>
                    <th scope="col" onClick={() => handleSort("publish_date")}>
                      Publish Date{renderSortIcon("publish_date")}
                    </th>
                    <th scope="col">Feature Images</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBlog?.map((blog: any) => (
                    <tr key={blog.id}>
                      <th scope="row">{blog?.id}</th>
                      <td>{blog?.title}</td>
                      <td>{blog?.content}</td>
                      <td>{blog?.category?.category_title}</td>
                      <td>{moment(blog?.publish_date).format("YYYY-MM-DD")}</td>
                      <td>
                        {JSON.parse(blog?.feature_image).map(
                          (image: any, index: any) => (
                            <Link href={image} target="_blank" key={index}>
                              <img
                                src={image}
                                alt={blog.title}
                                width={50}
                                className="m-2"
                                height={50}
                              />
                            </Link>
                          )
                        )}
                      </td>
                      <td>
                        <Link
                          href={`edit/${blog.id}`}
                          className="btn btn-sm btn-success ms-2"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-danger ms-2"
                          onClick={() => handleDelete(blog.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <span>Total {blogData?.length} no. of Blogs found.</span>
                <Paginate
                  recordsPerPage={recordsPerPage}
                  totalBlogs={blogData?.length}
                  paginate={paginate}
                  previousPage={previousPage}
                  nextPage={nextPage}
                  firstPage={firstPage}
                  lastPage={lastPage}
                />
              </div>
            </>
          ) : (
            <div>
              <h2 className="text-center">No Blog Found</h2>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default allBlogs;
