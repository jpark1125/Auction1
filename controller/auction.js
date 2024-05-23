//const { Auction } = require("../models");
const { AU } = require("../prototype");
const jwt = require("../utils/jwt");
const shortid = require("shortid");
//const { sequelize, QueryTypes } = require("../models");
const { client } = require("../middleware");

const auction = new AU();

module.exports = {
  Post: async (req, res) => {
    try {
      const { title, content, startPrice, bid, startTime, endTime } = req.body;
      const { xauth } = req.headers;
      const decoded = jwt.verifyToken(xauth);
      let id = shortid.generate();
      let userid = decoded.id;
      console.log("userid :", userid);
      console.log("req.files: ", req.files);
      let images = [];
      if (req.files && req.files.image) {
        if (Array.isArray(req.files.image)) {
          images = req.files.image.map((file) => "/img/" + file.location);
        } else {
          images.push("/img/" + req.files.image.location);
        }
      }
      console.log("images : ", images);

      const startTimeP = new Date(startTime);
      const endTimeP = new Date(endTime);

      const result = await auction.createPost(
        id,
        title,
        content,
        images,
        userid,
        startPrice,
        bid,
        startTimeP,
        endTimeP
      );

      return res.status(200).json({ result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  Delete: async (req, res) => {
    try {
      const { xauth } = req.headers;
      const decoded = jwt.verifyToken(xauth);

      const postId = req.body.id;

      const post = await auction.findOne({
        where: { id: postId, userId: decoded.id },
      });
      if (!post) {
        return res
          .status(404)
          .json({ error: "Post not found or not authorized to delete" });
      }
      const result = await auction.deletePost(postId);

      if (result)
        return res.status(200).json({ message: "Post deleted successfully" });
      else return res.status(404).json({ error: "Post not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  Get: async (req, res) => {
    try {
      const posts = await auction.getAllPosts();
      return res.status(200).json({ posts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  GetPost: async (req, res) => {
    try {
      const id = req.params.id;
      const post = await auction.getPostById(id);

      return res.status(200).json({ post });
    } catch (err) {
      console.error(err);
      res.status(404).json({ error: "Post not found" });
    }
  },

  Search: async (req, res) => {
    try {
      const { title, content } = req.body;
      const posts = await auction.searchPosts({ title, content });
      return res.status(200).json({ posts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  Update: async (req, res) => {
    try {
      const { xauth } = req.headers;
      const decoded = jwt.verifyToken(xauth);
      const { title, content, startPrice, bid, startTime, endTime } = req.body;
      const result = await auction.updatePost(decoded.id, {
        title,
        content,
        startPrice,
        bid,
        startTime,
        endTime,
      });

      if (result[0] > 0)
        return res.status(200).json({ message: "Post updated successfully" });
      else res.status(404).json({ error: "Post not found" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
