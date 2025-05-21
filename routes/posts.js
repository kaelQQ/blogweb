const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Create a new post
router.post('/', async (req, res) => {
  try {
    const { title, content, author, tags, category } = req.body;
    
    if (!title || !content || !author || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const processedTags = Array.isArray(tags) ? tags.filter(tag => tag.length > 0) : [];

    const newPost = new Post({
      title,
      content,
      author,
      tags: processedTags,
      category
    });

    console.log('Creating new post:', newPost);
    const savedPost = await newPost.save();
    console.log('Post saved successfully:', savedPost);

    res.status(201).json({ message: 'Post created successfully', post: savedPost });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET all posts or filter by tags and categories, with optional sorting
// Mosqueda - modified for sort function
router.get('/', async (req, res) => {
  const { tags, category, sortBy = 'createdAt', order = 'desc' } = req.query;
  const filter = {};

  if (tags) {
    filter.tags = { $in: tags.split(',').map(tag => tag.trim()) };
  }
  if (category) {
    filter.category = category;
  }

  // Validate sort field and direction
  const allowedSortFields = ['title', 'createdAt', 'author', 'category'];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
  const sortDirection = order === 'asc' ? 1 : -1;
  const sortOption = {};
  sortOption[sortField] = sortDirection;

  try {
    const posts = await Post.find(filter).sort(sortOption);
    console.log('Retrieved posts:', posts);
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    console.log('Retrieved post:', post);
    res.json(post);
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ message: err.message });
  }
});

// UPDATE post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;
    if (req.body.author) post.author = req.body.author;

    const updatedPost = await post.save();
    console.log('Updated post:', updatedPost);
    res.json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.deleteOne();
    console.log('Post deleted');
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new comment
router.post('/:id/comments', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = new Comment({
      postId: req.params.id,
      author: req.body.author,
      content: req.body.content
    });

    const newComment = await comment.save();
    console.log('Created new comment:', newComment);
    res.status(201).json(newComment);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(400).json({ message: err.message });
  }
});

// GET all comments for a post
router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id }).sort({ createdAt: -1 });
    console.log('Retrieved comments:', comments);
    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE a comment
router.delete('/comments/:commentId', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    await comment.deleteOne();
    console.log('Comment deleted');
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET sidebar content: categories, tags, recent posts
router.get('/sidebar/content', async (req, res) => {
  try {
    const categories = await Post.distinct('category');
    const tags = await Post.distinct('tags');
    const recentPosts = await Post.find({}, 'title _id createdAt')
                                  .sort({ createdAt: -1 })
                                  .limit(5);

    res.json({
      categories,
      tags,
      recentPosts
    });
  } catch (err) {
    console.error('Error fetching sidebar content:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;