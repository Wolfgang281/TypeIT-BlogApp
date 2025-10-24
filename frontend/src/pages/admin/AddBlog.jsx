/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const { axios, setBlogs } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);

      const blog = {
        title: title.trim(),
        subTitle: subTitle.trim(),
        description: quillRef.current.root.innerHTML.trim(),
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blogs/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(data.message);

        setTitle("");
        setSubtitle("");
        setCategory("Startup");
        setIsPublished(false);
        setImage(null);
        quillRef.current.root.innerHTML = "";
        setBlogs((prev) => [...prev, data.blog]);
        setIsAdding(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsAdding(false);
    }
  };

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
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow-rounded">
        <p>Upload Image</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="upload_area"
            className="mt-2 h-16 rounded cursor-pointer object-cover"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>

        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          placeholder="Enter Blog Title"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <p className="mt-4">Blog Subtitle</p>
        <input
          type="text"
          placeholder="Enter Blog Subtitle"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          value={subTitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 relative">
          <div ref={editorRef}></div>
        </div>

        <p className="mt-4">Blog Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded-2xl"
        >
          <option value="">Select Category</option>
          {blogCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="flex gap-2 mt-4 items-center">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        <button
          disabled={isAdding}
          className="mt-8 w-40 h-10 bg-primary text-white rounded-2xl cursor-pointer text-sm hover:bg-primary/80"
          type="submit"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
