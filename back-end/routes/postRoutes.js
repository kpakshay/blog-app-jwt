import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/postMiddleware.js";
import {
  getPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost
} from "../controller/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getSinglePost);

// below are protected
router.post("/", protect, upload.single("image"), createPost);

// router.post("/", createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;
