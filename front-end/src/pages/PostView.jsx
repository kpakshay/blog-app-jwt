import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../Context/useAuth";

export default function PostView() {
  const { id } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/posts/${id}`);
        setPost(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load post");
        toast.error("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading)
    return <p className="text-gray-600 text-center">Loading...</p>;

  if (error)
    return <p className="text-red-500 text-center">{error}</p>;

  if (!post)
    return <p className="text-gray-500 text-center">No post found</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">
        <b>By:</b> {post.author?.username || "Unknown"}
      </p>
      <p className="mb-6">{post.content}</p>

      {user && <Link
        to={`/edit/${post._id}`}
        className="text-blue-600 hover:underline"
      >
        Edit
      </Link>
      }
    </div>
  );
}
