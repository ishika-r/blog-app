import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allCategories } from "../features/dashboard/getCategoriesApiSlice";
import Link from "next/link";
import { useRouter } from "next/router";

const CategoriesListing = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log("router", typeof router.query.id);
  useEffect(() => {
    dispatch(allCategories());
  }, []);
  const categories = useSelector((state: any) => state.allCategories.data);
  console.log("categories", categories);
  return (
    <div className="px-4">
      <div className="f-20 fw-bold mb-3">Blog Categories</div>
      <div className="d-flex align-items-center flex-wrap gap-3">
        {categories?.map((category: any) => (
          <Link
            href={
              router.pathname === "/blogs"
                ? `categories/${category.id}`
                : `${category.id}`
            }
            className={
              Number(router.query.id) === Number(category.id)
                ? "btn bg-warning bg-opacity-20 text-dark rounded-pill"
                : "btn bg-secondary bg-opacity-10 text-dark rounded-pill "
            }
            key={category.id}
          >
            {category.category_title}
          </Link>

          // <button
          //   className="btn bg-secondary bg-opacity-10 text-dark rounded-pill"
          //   key={category.id}
          // >
          //   {category.category_title}
          // </button>
        ))}
        {/* <button className="btn bg-secondary bg-opacity-10 text-dark rounded-pill">
          Technology
        </button>
        <button className="btn bg-secondary bg-opacity-10 text-dark rounded-pill">
          Self Improvement
        </button>
        <button className="btn bg-secondary bg-opacity-10 text-dark rounded-pill">
          Writing
        </button>
        <button className="btn bg-secondary bg-opacity-10 text-dark rounded-pill">
          Realtionship
        </button> */}
      </div>
    </div>
  );
};

export default CategoriesListing;
