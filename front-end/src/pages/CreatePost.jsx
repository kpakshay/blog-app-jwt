import { useState } from "react";
// import { API } from "../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    let res = await axios.post("http://localhost:3000/api/posts", { title, content });
    // navigate("/");
    console.log(res)
  };

  return (
    <div>
      <h1>Create Post</h1>
      <input 
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea 
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={handleCreate}>Post</button>
    </div>
  );
}
