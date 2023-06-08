import { useRouter } from "next/router";
import React, { useEffect } from "react";
import CategoriesListing from "./CategoriesListing";
import { useDispatch, useSelector } from "react-redux";
import { getSingleBlog } from "../features/home/getSingleBlogApiSlice";
import moment from "moment";
import ReletedCategory from "../categories/ReletedCategory";
import Link from "next/link";
import ReletedBlogger from "./ReletedBlogger";

const Blog = () => {
  const router = useRouter();
  const id = router.query.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleBlog(id));
  }, [id]);
  const blog = useSelector((state: any) => state.singleBlog.data);
  console.log(blog);
  return (
    <div className="container">
      {/* <div className="filter-blog-div">All Blogs</div> */}

      <div className="row">
        <div className="col-md-9">
          <h1 className="blog-title-blog">{blog?.title}</h1>
          <div className="d-flex">
            <div>
              <img
                className="img-fluid rounded-circle size-50"
                src={blog?.user?.profile}
                alt=""
              />
            </div>
            <div className="user-div w-100">
              <p className="fs-4">{blog?.user?.name}</p>
              <p className="fs-5">
                {moment(blog?.publish_date).format("YYYY-MM-DD")}
              </p>
            </div>
            <div className="p-2 flex-shrink-1 bd-highlight">
              <Link
                className="badge rounded-pill bg-warning bg-opacity-25 text-dark fw-bold text-end fs-6 f-14 py-2 text-decoration-none"
                href={`/categories/${blog?.category?.id}`}
                title={`${blog?.category?.category_title} category`}
              >
                {blog?.category?.category_title} category
              </Link>
            </div>
          </div>
          <hr />
          <div className="images text-center">
            <img
              className="img-fluid p-5"
              src={
                blog?.feature_image ? JSON.parse(blog?.feature_image)[0] : ""
              }
              alt=""
            />
          </div>
          <div className="content-div fs-5">{blog?.content}</div>

          <div className="images text-center">
            <img
              className="img-fluid p-5"
              src={
                blog?.feature_image ? JSON.parse(blog?.feature_image)[1] : ""
              }
              alt=""
            />
          </div>
          <div className="content-div fs-5">{blog?.content}</div>
          <div className="images text-center">
            <img
              className="img-fluid p-5"
              src={
                blog?.feature_image ? JSON.parse(blog?.feature_image)[2] : ""
              }
              alt=""
            />
          </div>
          <div className="content-div fs-5">{blog?.content}</div>
        </div>

        <div className="col-md-3 border-start">
          <span className="fs-3">Related Blogs </span>
          <hr />
          <div className="same-category" title="Blogs from same category">
            {/* <span className="fs-5 border p-2 rounded-end same-blogs">
              {" "}
              From the same category{" "}
            </span> */}

            <ReletedCategory id={blog?.category?.id} blog_id={blog?.id} />
          </div>
          <hr />
          <div className="same-author" title="Blogs from same bloggers">
            {/* <span className="fs-5 border p-2 rounded-end same-blogs ">
              From the same blogger
            </span> */}

            <ReletedBlogger id={blog?.user?.id} blog_id={blog?.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
