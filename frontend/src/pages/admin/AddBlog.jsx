/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState(" ");
  const [subTitle, setSubtitle] = useState(" ");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const generateContent = () => {};

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex-1  bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow-rounded">
        <p>Upload Image</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)} //! to show uploaded image
            alt="upload_area"
            className="mt2
           h-16 rounded cursor-pointer"
          />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            name=""
            id="image"
            hidden
            required
          />
        </label>
        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          name=""
          placeholder="Enter Blog Title"
          required
          id=""
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <p className="mt-4">Blog Subtitle</p>
        <input
          type="text"
          name=""
          placeholder="Enter Blog Subtitle"
          required
          id=""
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          value={subTitle}
          onChange={(e) => {
            setSubtitle(e.target.value);
          }}
        />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 relative">
          <div ref={editorRef}></div>
          <button
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
            onClick={generateContent}
            type="button"
          >
            Generate With AI
          </button>
        </div>
        <p className="mt-4">Blog Category</p>
        <select
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          value={category}
          name="category"
          id=""
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded-2xl"
        >
          <option value="">Select Category</option>
          {blogCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            name=""
            checked={isPublished}
            className="scale-125 cursor-pointer"
            id=""
            onChange={(e) => {
              setIsPublished(e.target.value);
            }}
          />
        </div>
        <button
          className="mt-8 w-40 h-10 bg-primary text-white rounded-2xl cursor-pointer text-sm hover:bg-primary/80"
          type="submit"
        >
          Add Blog
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
