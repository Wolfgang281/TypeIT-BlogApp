import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/user/blog/all");
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const verifyUser = async () => {
    try {
      const { data } = await axios.get("/api/admin/auth/verify");
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

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};
