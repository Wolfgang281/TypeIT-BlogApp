import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState([]);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blogs/all");
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const verifyUser = async () => {
    try {
      const { data } = await axios.get("/api/admin/verify");
      if (data.success) {
        setToken(true);
      }
    } catch (error) {
      setToken(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    verifyUser();
    // const token = localStorage.getItem("token");
    // if (token) {
    // setToken(token);
    // axios.defaults.headers.common["Authorization"] = `${token}`;
    // }
  }, []);

  const value = {
    axios,
    navigate,
    blogs,
    setBlogs,
    input,
    setInput,
    token,
    setToken,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
