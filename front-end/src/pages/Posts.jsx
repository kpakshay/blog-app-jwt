import { useEffect, useState } from "react";
// import { API } from "../api";
import axios from "axios";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/posts").then(res => setPosts(res.data));
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      {posts.map(p => (
        <div key={p._id} style={{ border: "1px solid #ddd", margin: 10, padding: 10 }}>
          <h2>{p.title}</h2>
          <p>{p.content.slice(0, 100)}...</p>
          {/* <p>By {p.author.username}</p> */}
          <a href={`/post/${p._id}`}>Read More</a>
        </div>
      ))}
    </div>
  );
}
