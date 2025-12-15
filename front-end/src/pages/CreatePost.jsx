import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/useAuth";

export default function CreatePost() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleCreate = async () => {
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/posts",
        { title, content },
        { withCredentials: true }
      );

      toast.success("Post created successfully");
      navigate("/posts");

    } catch (err) {
      let message = "Something went wrong";

      if(err.respomse?.status === 401) {
        message = "Please login in to create a post";
      } else if (err.response?.status ===403){
        message = "You are not allowed to create a post";
      }

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Post</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-3 mb-4 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
}
