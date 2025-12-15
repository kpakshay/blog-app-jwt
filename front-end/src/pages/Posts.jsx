import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/posts");
        setPosts(res.data);
      } catch (err) {
        setError("Failed to load posts");
        toast.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading)
    return <p className="text-gray-600">Loading posts...</p>;

  if (error)
    return <p className="text-red-500">{error}</p>;

  if (posts.length === 0)
    return (
      <p className="text-gray-500 text-center">
        No posts available yet.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Posts</h1>
      {posts.map(p => (
        <div
          key={p._id}
          className="border border-gray-300 rounded-md p-4 mb-4 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-gray-800">{p.title}</h2>

          <p className="text-gray-600">{p.content.slice(0, 100)}...</p>

          <p className="text-sm text-gray-500">
            By {p.author?.username || "Unknown"}
          </p>

          <Link
            to={`/post/${p._id}`}
            className="text-blue-600 hover:underline"
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
}
