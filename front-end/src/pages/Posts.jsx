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

  const truncate = (str, n = 120) =>
    str.length > n ? str.slice(0, n).trim() + "..." : str;


  if (loading)
    return <p className="text-gray-600 text-center">Loading Posts...</p>;

  if (error)
    return <p className="text-red-500 text-center">{error}</p>;

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
        <div key={p._id} className="border border-gray-300 rounded-md p-6 mb-6 shadow hover:shadow-md transition">
          
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{p.title}</h2>

          <p className="text-sm text-gray-500 mb-4">
            By {p.author?.username || "Unknown"} • {new Date(p.createdAt).toLocaleDateString()}
            {p.createdAt !== p.updatedAt && (
              <> • Last updated {new Date(p.updatedAt).toLocaleDateString()}</>
            )}
          </p>

          <p className="text-gray-600 mb-4">{truncate(p.content)}</p>

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
