import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allBlogs } from "../features/home/getAllBlogsApiSlice";
import moment from "moment";
import Link from "next/link";

const AllBlogs = () => {
  const dispatch = useDispatch();
  const dtaPerRow = 3;
  const [next, setNext] = useState(dtaPerRow);
  const [loading, setLoading] = useState(false);
  const handleMoreBlog = () => {
    setNext(next + dtaPerRow);
  };

  useEffect(() => {
    dispatch(allBlogs());
  }, []);
  const allblogs = useSelector((state: any) => state.allBlogs.data);
  console.log(allblogs);
  console.log(allblogs);
  const dateFromNow = (publishDate: any): any => {
    console.log("publish date", publishDate);
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
  return (
    <>
      {allblogs?.slice(0, next)?.map((blog: any) => (
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
                    <span className="badge rounded-pill bg-secondary bg-opacity-25 text-dark fw-normal f-14 py-2">
                      {blog.category.category_title}
                    </span>
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
      {next < allblogs?.length && (
        <button className="mt-4" onClick={handleMoreBlog}>
          Load more
        </button>
      )}
    </>
  );
};

export default AllBlogs;
