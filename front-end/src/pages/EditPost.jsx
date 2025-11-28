import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/posts/${id}`);
                setTitle(res.data.title);
                setContent(res.data.content);
            } catch (err) {
                console.error(err);
                setError("Failed to load post");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleUpdate = async () => {
        if (!title || !content) {
            setError("Title and content are required");
            return;
        }
        setSaving(true);
        setError(null);
        try {
            await axios.put(`http://localhost:3000/api/posts/${id}`,
                { title, content },
                { withCredentials: true }
            );
            alert(res.data.message); // show success message
            navigate(`/post/${id}`);
        } catch (err) {
            if (err.response?.status === 403) {
                setError("You are not allowed to edit this post");
            } else if (err.response?.status === 404) {
                setError("Post not found");
            } else {
                setError("Something went wrong");
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p className="text-gray-600">Loading post...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Edit Post</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Title"
            />

            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 mb-4 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Content"
            />

            <button
                onClick={handleUpdate}
                disabled={saving}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
                {saving ? "Saving..." : "Save"}
            </button>
        </div>
    );
}
