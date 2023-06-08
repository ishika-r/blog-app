import Link from "next/link";
import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { allBlogs } from "../features/home/getAllBlogsApiSlice";
import moment from "moment";
const Slider = ({ title }: any) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allBlogs());
  }, []);
  const blogs = useSelector((state: any) => state.allBlogs.data);
  console.log("blogs0", blogs);
  return (
    <>
      <div className="d-flex justify-content-center">
        <h1 className="slider-title">{title}</h1>
      </div>
      <hr />
      {blogs?.length > 0 ? (
        <Carousel
          responsive={responsive}
          autoPlay
          autoPlaySpeed={2000}
          infinite
          pauseOnHover
        >
          {blogs?.map((blog: any) => (
            <div className="main-slider-div" key={blog?.id}>
              <div className="card slider-card">
                <div className="card-body">
                  <div className="image text-end">
                    <span className="badge bg-dark  category-badge ">
                      {blog?.category.category_title}
                    </span>
                    <img
                      src={JSON.parse(blog?.feature_image)[0]}
                      alt=""
                      className="slider-blog-image"
                    />
                    {/* <span className="badge bg-dark  author-badge">
                      {blog?.user.name}
                    </span> */}
                  </div>
                  <div className="blog-title">
                    <p className="blog-title-p">{blog?.title}</p>
                  </div>
                  <p className="blog-content">
                    {(blog?.content).substr(0, 50)}...
                  </p>

                  <div className="read-more-div d-flex justify-content-between">
                    <span className="pt-2">
                      {moment(blog?.publish_date).format("YYYY-MM-DD")}
                    </span>
                    <Link href={`blogs/${blog?.id}`} className="read-more-btn">
                      READ MORE
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        ""
      )}
    </>
  );
};

export default Slider;
