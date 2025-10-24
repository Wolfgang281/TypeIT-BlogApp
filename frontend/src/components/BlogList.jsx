import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === "") return blogs;
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input) ||
        blog.category.toLowerCase().includes(input)
    );
  };

  // Combine filters once for easier reuse
  const visibleBlogs = filteredBlogs().filter((blog) =>
    menu === "All" ? true : blog.category === menu
  );

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((category) => (
          <div key={category} className="relative">
            <button
              onClick={() => {
                setMenu(category);
              }}
              className={`cursor-pointer text-gray-500 ${
                menu === category ? "text-white px-4 pt-0.5" : ""
              }`}
            >
              {category}
              {menu === category && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* 🧠 Funny Empty-State Message */}
      {visibleBlogs.length === 0 ? (
        <div className="text-center text-gray-500 my-20 text-lg font-medium">
          😅 Oops! Looks like our bloggers took a coffee break ☕ — no posts
          found!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
          {visibleBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
