import React from "react";

const Paginate = ({
  recordsPerPage,
  totalBlogs,
  paginate,
  previousPage,
  nextPage,
  firstPage,
  lastPage,
}: any) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBlogs / recordsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <nav className="pagination-container" aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li onClick={firstPage} className="page-item page-number">
            <a className="page-link">First</a>
          </li>
          <li onClick={previousPage} className=" page-item page-number">
            <a className="page-link">Previous</a>
          </li>
          {pageNumbers.map((number) => (
            <li
              key={number}
              onClick={() => paginate(number)}
              className="page-number page-item"
            >
              <a className="page-link">{number}</a>
            </li>
          ))}
          <li onClick={nextPage} className="page-item page-number">
            <a className="page-link">Next</a>
          </li>
          <li onClick={lastPage} className="page-item page-number">
            <a className="page-link">Last</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Paginate;
