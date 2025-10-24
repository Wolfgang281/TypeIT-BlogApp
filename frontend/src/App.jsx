import React from "react";
import { Routes, Route } from "react-router-dom";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";

import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import BlogLists from "./pages/admin/BlogLists";
import Comments from "./pages/admin/Comments";
import Login from "./components/admin/Login";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { token } = useAppContext();
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="blogLists" element={<BlogLists />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
