import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { axios } = useAppContext();

  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/blogs/${id}`);
      data.success
        ? setData(data.blog)
        : toast.error(data.response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/api/comments/${id}`);
      data.success
        ? setComments(data.comments)
        : toast.error(data.response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/comments/add/${id}`,
        { name, content },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchComments();
        setName("");
        setContent("");
      } else {
        toast.error(data.response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchComments();
  }, []);

  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt="gradientBackground"
        className="absolute -top-50 -z-1 opacity-50"
      />
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format("Do MMMM YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          UTK
        </p>
      </div>
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt="blog-image" className="rounded-3xl mb-5" />
        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="relative  bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-500"
              >
                <div>
                  <img src={assets.user_icon} alt="user-icon" className="w-6" />
                  <p className="font-medium"> {comment.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8">{comment.content}</p>
                <div className="text-xs text-gray-400 absolute right-4 bottom-3 flex items-center gap-2">
                  {Moment(comment.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* comment section */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add a comment</p>
          <form
            action=""
            className="flex flex-col items-start gap-4 max-w-lg"
            onSubmit={addComment}
          >
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              name=""
              id=""
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
              value={name}
            />
            <textarea
              onChange={(e) => {
                setContent(e.target.value);
              }}
              name=""
              placeholder="Comment"
              className="w-full p-2 border border-gray-300 rounded outline-none h-48"
              id=""
              required
              value={content}
            ></textarea>
            <button
              type="submit"
              className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
            >
              Comment
            </button>
          </form>
        </div>
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex">
            <img src={assets.facebook_icon} alt="facebook_icon" width={50} />
            <img src={assets.twitter_icon} alt="twitter_icon" width={50} />
            <img
              src={assets.googleplus_icon}
              alt="googleplus_icon"
              width={50}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
