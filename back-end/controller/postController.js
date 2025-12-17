import Post from "../models/postModels.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate("author", "username");
    console.log(posts, "posts")
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};


export const getSinglePost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "username");

  if (!post) return res.status(404).json({ message: "Post not found" });

  res.json(post);
};

export const createPost = async (req, res) => {
  try {
    let imageUrl = null;

    if(req.file){
      imageUrl = `uploads/${req.file.filename}`
    }
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user._id,
      imageUrl
    });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.log(error, "Create Post Error")
    res.status(500).json({ message: "Server Error" })
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Ensure only owner can edit
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    post.title = req.body.title;
    post.content = req.body.content;
    await post.save();

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    console.log(error, "Update Post Error")
    res.status(500).json({ message: "Server Error" })
  }
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
