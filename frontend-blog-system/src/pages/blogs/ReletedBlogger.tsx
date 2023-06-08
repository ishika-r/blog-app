import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBlog } from "../features/dashboard/getUserBlogApiSlice";
import moment from "moment";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const ReletedBlogger = ({ id, blog_id }: any) => {
  console.log("userid", id, "blog id", blog_id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getUserBlog(id));
    }
  }, [id]);
  const blogs = useSelector((state: any) => state.getUserBlog.data);
  console.log("user blogs", blogs);
  return (
    <>
      {blogs?.length >= 0 ? (
        <>
          {blogs?.slice(0, 2)?.map((blog: any) => (
            <>
              {Number(blog_id) !== Number(blog?.id) && (
                <div
                  className="card card-related mt-3"
                  key={blog?.id}
                  // style={{ width: "20rem" }}
                >
                  <Link
                    className="badge bg-dark  category-badge m-1 text-decoration-none"
                    title={`${blog?.category?.category_title} category`}
                    href={`/categories/${blog?.category?.id}`}
                  >
                    {blog?.category?.category_title}
                  </Link>
                  {/* <span className="badge bg-dark  category-badge m-1">
                    {blog?.category.category_title}
                  </span> */}
                  <img
                    className=""
                    src={
                      blog?.feature_image
                        ? JSON.parse(blog?.feature_image)[0]
                        : ""
                    }
                    height={150}
                    alt=""
                  />
                  <div className="card-body">
                    <h5 className="card-title">{blog?.title}</h5>
                    <div className="card-text" style={{ marginBottom: 10 }}>
                      {(blog?.content).substr(0, 50)}...
                    </div>

                    <div className="read-more-div d-flex justify-content-between">
                      <span className="pt-2 text-secondary">
                        {moment(blog?.publish_date).format("YYYY-MM-DD")}
                      </span>
                      <Link
                        href={`/blogs/${blog?.id}`}
                        className="read-more-btn"
                      >
                        READ MORE
                        <FaArrowRight />
                      </Link>
                    </div>
                    {/* <a href="#" className="btn btn-primary">
                      Go somewhere
                    </a> */}
                  </div>
                </div>
              )}
            </>
          ))}
        </>
      ) : (
        <p>No blogs found</p>
      )}
    </>
  );
};

export default ReletedBlogger;
