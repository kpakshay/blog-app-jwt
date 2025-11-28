import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    let res=axios.get(`http://localhost:3000/api/posts/${id}`).then(res => setPost(res.data));
    console.log(res)
  }, [id]);

  if (!post) return "Loading...";

  return (
    <div>
      <h1>{post.title}</h1>
      {/* <p><b>By:</b> {post.author.username}</p> */}
      <p>{post.content}</p>

      <a href={`/edit/${post._id}`}>Edit</a>
    </div>
  );
}
