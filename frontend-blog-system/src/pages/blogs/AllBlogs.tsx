import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allBlogs } from "../features/home/getAllBlogsApiSlice";
import moment from "moment";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import Search from "../components/Search";

const AllBlogs = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [data, setData]: any = useState([]);
  // Search Blogs

  useEffect(() => {
    dispatch(allBlogs({ page: page }));
  }, [page]);
  const allblogs = useSelector((state: any) => state.allBlogs.data);
  useEffect(() => {
    if (Array.isArray(allblogs)) {
      setData((prev: any[]) => {
        const uniqueBlogs = allblogs.filter(
          (blog: any) => !prev.find((prevBlog) => prevBlog.id === blog.id)
        );
        return [...prev, ...uniqueBlogs];
      });
    }
  }, [allblogs]);

  const handleInfiniteScroll = async () => {
    console.log("scrollheight", document.documentElement.scrollHeight);
    console.log("inner height", window.innerHeight);
    console.log("scroll top", document.documentElement.scrollTop);
    try {
      if (
        !isLoading &&
        !allDataLoaded &&
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight
      ) {
        setIsLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Pagination
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  useEffect(() => {
    if (isLoading && allblogs?.length > 0) {
      setIsLoading(true);
    }
    if (allblogs?.length === 0) {
      setIsLoading(false);
      setAllDataLoaded(true);
    }
  }, [isLoading, allblogs]);

  const dateFromNow = (publishDate: any): any => {
    const formattedDate = publishDate
      ? moment(publishDate).format("YYYY-MM-DD")
      : "No publish date available";
    const timeFromNow = publishDate
      ? moment(publishDate).fromNow()
      : "No publish date available";
    // console.log("Formatted date:", formattedDate);
    // console.log("Time from now:", timeFromNow);
    return timeFromNow;
  };

  // console.log(allblogs);
  return (
    <>
      {data?.map((blog: any) => (
        <div className="row align-items-center" key={blog.id}>
          <div className="col-md-8 mb-4">
            <div className="d-flex align-items-center position-relative gap-3">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center gap-2">
                  <div>
                    <img
                      className="img-fluid rounded-circle size-26"
                      src={blog.user.profile}
                      alt=""
                    />
                  </div>
                  <div>
                    <a href="" className="text-decoration-none text-dark f-14">
                      {blog.user.name}
                    </a>
                  </div>
                  <div>
                    <a href="" className="text-decoration-none text-dark f-14">
                      <i className="fa-solid fa-circle-check fa-sm text-primary" />
                    </a>
                  </div>
                  <div className="text-muted f-14">
                    {moment(blog?.publish_date).format("YYYY-MM-DD")}
                  </div>
                  <div>
                    <i className="fa-solid fa-star fa-sm text-warning" />
                  </div>
                  {/* <div className="text-muted f-14">Member-only</div> */}
                </div>
                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-dark text-decoration-none"
                >
                  <div className="fw-bold f-20">{blog.title}</div>
                  <div className="mb-3">
                    {(blog?.content).substr(0, 250)}...
                  </div>
                </Link>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link
                      className="badge rounded-pill bg-secondary bg-opacity-25 text-dark fw-normal f-14 py-2 text-decoration-none"
                      href={`/categories/${blog?.category?.id}`}
                    >
                      {blog?.category?.category_title}
                    </Link>
                    {/* <span className="badge rounded-pill bg-secondary bg-opacity-25 text-dark fw-normal f-14 py-2">
                      {blog?.category.category_title}
                    </span> */}
                    <div className="f-14 text-muted">
                      {dateFromNow(blog?.publish_date)}
                    </div>
                    {/* <div className="f-14 text-muted">Read more</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div>
              <Link
                href={`/blogs/${blog.id}`}
                className="text-dark text-decoration-none"
              >
                <img
                  className="img-fluid"
                  src={JSON.parse(blog?.feature_image)[0]}
                  width={150}
                  height={150}
                  // src="https://miro.medium.com/v2/resize:fill:112:112/1*faOr3jx-Czy7hd1p9YFBHQ.png"
                  alt=""
                />
              </Link>
            </div>
          </div>
          <hr />
        </div>
      ))}
      {isLoading && (
        <h1 className="text-center">
          <CircularProgress color="inherit" />
        </h1>
      )}
      {allDataLoaded && (
        <h3 className="text-center text-secondary">
          You are at the end of the page..
        </h3>
      )}
    </>
  );
};

export default AllBlogs;
