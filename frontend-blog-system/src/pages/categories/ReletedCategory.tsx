import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleCategory } from "../features/home/getSingleCategoryApiSlice";
import Link from "next/link";
import moment from "moment";
import { FaArrowRight } from "react-icons/fa";

const ReletedCategory = ({ id, blog_id }: any) => {
  // console.log("id from related", id, "blog id", blog_id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(singleCategory(id));
    }
  }, [id]);
  const category = useSelector((state: any) => state.singleCategory.data);

  // console.log("category", category);
  return (
    <>
      {category?.blogs?.length >= 0 ? (
        <>
          {category?.blogs?.slice(0, 2)?.map((blog: any) => (
            <>
              {Number(blog_id) !== Number(blog?.id) && (
                <div
                  className="card card-related mt-3"
                  key={blog?.id}
                  // style={{ width: "20rem" }}
                >
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

export default ReletedCategory;
