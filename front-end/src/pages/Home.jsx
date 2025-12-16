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
      
      {/* HERO SECTION */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          Welcome to MyBlog
        </h1>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          A community-driven blogging platform where anyone can share ideas,
          stories, opinions, and knowledge on any topic.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/posts"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition-colors"
          >
            Explore Blogs
          </Link>
          <Link
            to="/create"
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-md font-semibold transition-colors"
          >
            Write a Post
          </Link>
        </div>
      </section>

      {/* LATEST POSTS */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Latest Community Posts
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-600">
            No posts yet. Be the first to write one!
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-5 rounded-md shadow hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500 text-sm">
                  Image Placeholder
                </div>

                <h3 className="font-semibold text-lg mb-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 text-sm">
                  {post.content
                    ? post.content.slice(0, 100)
                    : "No content available"}...
                </p>

                <Link
                  to={`/post/${post._id}`}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ABOUT SECTION */}
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          What is MyBlog?
        </h2>
        <p className="text-gray-600 mb-6">
          MyBlog is an open blogging platform where anyone can create an account
          and publish posts on topics they care about — from personal stories
          and opinions to education, hobbies, culture, and global issues.
        </p>
        <Link
          to="/posts"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition-colors"
        >
          Read All Posts
        </Link>
      </section>

    </div>
  );
}
