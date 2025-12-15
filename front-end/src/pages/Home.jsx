import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/posts");
      setPosts(Array.isArray(res.data) ? res.data.slice(0, 3) : []);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };
  fetchPosts();
}, []);


  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          Welcome to MyBlog
        </h1>
        <p className="text-gray-600 mb-6">
          Sharing tutorials, insights, and stories about coding and technology.
        </p>
        <Link
          to="/posts"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition-colors"
        >
          Read All Posts
        </Link>
      </section>

      {/* Dynamic Latest Posts */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
        {loading ? (
          <p className="text-gray-600">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-600">No posts available yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-4 rounded-md shadow hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500">
                  Image Placeholder
                </div>
                <h3 className="font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">
                  {post.content.slice(0, 80)}...
                </p>
                <Link
                  to={`/post/${post._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">About This Blog</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          MyBlog is a space where I share tutorials, insights, and personal projects
          about coding and software development. Stay tuned and explore the posts to level up your skills!
        </p>
        <Link
          to="/posts"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition-colors"
        >
          Explore All Posts
        </Link>
      </section>
    </div>
  );
}
