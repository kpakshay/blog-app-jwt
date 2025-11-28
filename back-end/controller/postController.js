import Post from "../models/postModels.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    // .populate("author", "username");
    console.log(posts,"posts")
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};


export const getSinglePost = async (req, res) => {
  const post = await Post.findById(req.params.id)
//   .populate("author", "username");
  
  if (!post) return res.status(404).json({ message: "Post not found" });
  
  res.json(post);
};

export const createPost = async (req, res) => {
  const post = await Post.create({
    title: req.body.title,
    content: req.body.content,
    // author: req.user._id
  });

  res.json(post);
};

export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: "Post not found" });

  // Ensure only owner can edit
  if (post.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not allowed" });
  }

  post.title = req.body.title;
  post.content = req.body.content;
  await post.save();

  res.json(post);
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: "Post not found" });

  if (post.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await post.deleteOne();
  res.json({ message: "Post deleted" });
};
