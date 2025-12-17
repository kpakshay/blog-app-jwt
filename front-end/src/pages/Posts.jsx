import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const truncate = (str, n = 120) => {
    return str.length > n ? str.slice(0, n).trim() + "..." : str;
  }

  const filteredPosts = useMemo(() => {
    if (!debouncedSearch.trim())
      return posts;

    const q = debouncedSearch.toLowerCase();

    return posts.filter(p =>
      p.title?.toLowerCase().includes(q) ||
      p.content?.toLowerCase().includes(q) ||
      p.author?.username?.toLowerCase().includes(q)
    );
  }, [posts, debouncedSearch]);


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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        
        <h1 className="text-2xl font-bold">All Posts</h1>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by title, content, or author"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
        </div>
      </div>

      {debouncedSearch.trim() && (
        <p className="text-sm text-gray-500 mb-4">
          Showing {filteredPosts.length} result(s)
        </p>
      )}

      {debouncedSearch.trim() && filteredPosts.length === 0 && (
        <p className="text-gray-500 text-center">
          No posts match your search.
        </p>
      )}

      {filteredPosts.map(p => (
        <div key={p._id} className="border border-gray-300 rounded-md p-6 mb-6 shadow hover:shadow-md transition">

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{p.title}</h2>

          <p className="text-sm text-gray-500 mb-4">
            By {p.author?.username || "Unknown"} • {new Date(p.createdAt).toLocaleDateString()}
            {p.createdAt !== p.updatedAt && (
              <> • Last updated {new Date(p.updatedAt).toLocaleDateString()}</>
            )}
          </p>

          {p.imageUrl && (
            <img
              src={`http://localhost:3000/${p.imageUrl}`}
              alt={p.title}
              className="w-full max-h-96 object-cover rounded-md mb-6"
            />
          )}

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
