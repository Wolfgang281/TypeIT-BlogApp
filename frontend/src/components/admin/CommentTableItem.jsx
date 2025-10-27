import toast from "react-hot-toast";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const CommentTableItem = ({ comment, fetchComments }) => {
  console.log(comment);
  const { blogId, createdAt, _id } = comment;
  const blogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const handleApproveComment = async (id) => {
    try {
      await axios.patch(`/api/admin/comment/approve-comment/${id}`);
      await fetchComments();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`/api/admin/comment/delete-comment/${id}`);
      await fetchComments();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <tr className="order-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b> : {blogId.title}
        <br />
        <br />
        <b className="font-medium text-gray-600"> Name</b> : {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {comment.content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        {blogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-left gap-4">
          {!comment.isApproved ? (
            <img
              onClick={() => {
                handleApproveComment(comment._id);
              }}
              src={assets.tick_icon}
              alt="tick_icon"
              className="w-5 hover:scale-110 transition-all cursor-pointer"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <img
            onClick={() => {
              handleDeleteComment(comment._id);
            }}
            src={assets.bin_icon}
            alt="bin_icon"
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
