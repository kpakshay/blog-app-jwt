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
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCreate = async () => {
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }
      const res = await axios.post(
        "http://localhost:3000/api/posts",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success("Post created successfully");
      navigate("/posts");

    } catch (err) {
      let message = "Something went wrong";

      if (err.response?.status === 401) {
        message = "Please login in to create a post";
      } else if (err.response?.status === 403) {
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

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cover Image (optional)
        </label>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition cursor-pointer relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          {!preview ? (
            <p className="text-gray-500 text-sm">
              Click to upload an image
            </p>
          ) : (
            <img
              src={preview}
              alt="Preview"
              className="h-40 w-full object-cover rounded-md"
            />
          )}
        </div>

        {preview && (
          <button
            type="button"
            onClick={() => {
              setImage(null);
              setPreview(null);
            }}
            className="mt-2 text-sm text-red-500 hover:underline"
          >
            Remove image
          </button>
        )}
      </div>

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
