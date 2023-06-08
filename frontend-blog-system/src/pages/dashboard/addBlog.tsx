import React, { use, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDropzone } from "react-dropzone";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { storeFeatureImage, updateBlog } from "../features/dashboard/blogSlice";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { createBlog } from "../features/dashboard/createBlogApiSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allCategories } from "../features/dashboard/getCategoriesApiSlice";

const addBlog = () => {
  const [files, setFiles]: any = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allCategories());
  }, []);
  const categories = useSelector((state: any) => state.allCategories.data);
  // console.log("categories", categories);
  const blogData = useSelector((state: any) => state.blog.blog);

  // Function to handle file drop
  const handleDrop = (acceptedFiles: any) => {
    // const newFiles = [...files, ...acceptedFiles.slice(0, 1 - files.length)];
    // console.log("accepted files", acceptedFiles);
    setFiles(acceptedFiles);
  };
  useEffect(() => {
    dispatch(storeFeatureImage(files));
  }, [files]);
  // Function to remove a file from the array
  const handleRemove = (index: any) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };
  // Use the dropzone hook
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: true,
    maxFiles: 5 - files.length,
  });
  // Handle change event
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    dispatch(updateBlog<any>({ name, value }));
  };
  // Submit blog
  const handleSubmit = (event: any) => {
    const formData: any = new FormData();
    formData.append("title", blogData.title);
    formData.append("content", blogData.content);
    formData.append("category", blogData.category);
    formData.append("publish_date", blogData.publish_date);
    // formData.append("feature_image", blogData.feature_image);
    for (let i = 0; i < files.length; i++) {
      formData.append("feature_image", files[i]);
    }
    // To retreive form data
    for (var pair of formData.entries()) {
      console.log(typeof pair[1]);
      console.log(pair[0] + " - " + pair[1]);
    }
    dispatch(createBlog(formData));
  };
  return (
    <Layout>
      <ToastContainer />
      <div className="card card-add-blog">
        <div className="card-title">
          <h3>Add New Blog</h3>
        </div>
        <hr />
        <div className="card-body">
          {/* blog title */}
          <div className="row">
            <div className="col-lg-2 text-end pt-1">
              <label htmlFor="title">Blog Title </label>
            </div>
            <div className="col-lg-10">
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Add blog title..."
                value={blogData.title}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Blog content */}
          <div className="row">
            <div className="col-lg-2 text-end pt-1">
              <label htmlFor="content">Blog Content </label>
            </div>
            <div className="col-lg-10">
              <textarea
                name="content"
                className="form-control"
                placeholder="Add blog content here..."
                value={blogData.content}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* blog category */}
          <div className="row">
            <div className="col-lg-2 text-end">
              <label htmlFor="category">Blog Category </label>
            </div>
            <div className="col-lg-10">
              <select
                name="category"
                className="form-control"
                value={blogData.category}
                onChange={handleChange}
              >
                <option value="">--Select Category--</option>
                {categories?.map((category: any) => (
                  <option value={category.id} key={category.id}>
                    {category.category_title} Blogs
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* blog Publish date */}
          <div className="row">
            <div className="col-lg-2 text-end pt-1">
              <label htmlFor="publish_date">Publish Date </label>
            </div>
            <div className="col-lg-10">
              <input
                type="date"
                value={blogData.publish_date}
                onChange={handleChange}
                name="publish_date"
                className="form-control"
              />
            </div>
          </div>
          {/* Multiple images for blog */}
          <div className="row">
            <div className="col-lg-2 text-end pt-1">
              <label htmlFor="feature_image">Feature Images </label>
            </div>
            <div className="col-lg-10">
              <div {...getRootProps()} className="dropzone">
                <input
                  {...getInputProps()}
                  name="feature_image"
                  accept="image/png, image/gif, image/jpeg"
                />
                {isDragActive ? (
                  <p className="file-upload-p text-center ">
                    Drop the files here...
                  </p>
                ) : (
                  <p className="file-upload-p text-center ">
                    Drag and drop files here, or click to select files(Max
                    files:5)
                  </p>
                )}
              </div>
              {files.length > 0 && (
                <div>
                  <ul>
                    {files.map((file: any, index: any) => (
                      <li key={index} className="m-2">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          width={40}
                          height={40}
                          className="m-2"
                        />
                        {file.name} ({file.size} bytes)
                        <span
                          onClick={() => handleRemove(index)}
                          className="badge text-bg-danger m-2"
                        >
                          <FaTimes />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="submit-data">
            <button
              onClick={handleSubmit}
              className="btn btn-custom"
              style={{
                marginTop: "0 !important",
              }}
            >
              Add Blog
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default addBlog;
