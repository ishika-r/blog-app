import Layout from "@/pages/components/Layout";
import {
  storeFeatureImage,
  updateBlog,
} from "@/pages/features/dashboard/blogSlice";
import { getBlog } from "@/pages/features/dashboard/getBlogByIdApiSlice";
import { allCategories } from "@/pages/features/dashboard/getCategoriesApiSlice";
import { updateBlogapi } from "@/pages/features/dashboard/updateBlogApiSlice";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const editBlog = () => {
  const router = useRouter();
  const id = router.query.id;
  // router.back()
  console.log("router", router);
  const [files, setFiles]: any = useState([]);
  useEffect(() => {
    dispatch(allCategories());
  }, []);
  const categories = useSelector((state: any) => state.allCategories.data);

  const blogData = useSelector((state: any) => state.blog.blog);
  console.log("update blog data", blogData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getBlog(id));
    }
  }, [dispatch, id]);
  const apiData = useSelector((state: any) => state.getBlogById.data);

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
  useEffect(() => {
    if (apiData?.title !== undefined) {
      dispatch(updateBlog<any>({ name: "title", value: apiData?.title }));
    }
    if (apiData?.content !== undefined) {
      dispatch(updateBlog<any>({ name: "content", value: apiData?.content }));
    }
    if (apiData?.category !== undefined) {
      dispatch(
        updateBlog<any>({ name: "category", value: apiData?.category.id })
      );
    }
    if (apiData?.publish_date !== undefined) {
      dispatch(
        updateBlog<any>({
          name: "publish_date",
          value: moment(apiData?.publish_date).format("YYYY-MM-DD"),
        })
      );
    }
    if (apiData?.feature_image !== undefined) {
      dispatch(storeFeatureImage(apiData?.feature_image));
    }
  }, [apiData]);
  console.log("this is blog data ", blogData);
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
    dispatch(updateBlogapi({ id, formData, router }));
  };
  return (
    <Layout>
      <ToastContainer />
      <div className="card card-add-blog mt-2">
        <div className="card-title">
          <h3>Update Blog Id : {id}</h3>
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
                  <option value={category.id} key={category.id} selected>
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
                <input {...getInputProps()} name="feature_image" />
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

export default editBlog;
