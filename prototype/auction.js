const { tbl_auction } = require("../models");
const { Op } = require("sequelize");

class AU {}

AU.prototype.createPost = async (
  id,
  title,
  content,
  images,
  userId,
  startPrice,
  bid,
  startTime,
  endTime
) => {
  console.log(
    "userId",
    id,
    title,
    content,
    images,
    userId,
    startPrice,
    bid,
    startTime,
    endTime
  );
  const imagePath = images.join(",");
  console.log(
    "userId",
    id,
    title,
    content,
    imagePath,
    userId,
    startPrice,
    bid,
    startTime,
    endTime
  );
  return await tbl_auction.create({
    id,
    title,
    content,
    image: imagePath,
    userId,
    startPrice,
    bid,
    startTime,
    endTime,
  });
};

AU.prototype.deletePost = async (id) => {
  return await Auction.destroy({ where: { id: id } });
};

AU.prototype.getAllPosts = async () => {
  const posts = await Auction.findAll({
    attributes: ["id", "userId", "title", "image"],
  });

  const modifiedPosts = posts.map((post) => {
    let firstImage = null;

    if (post.image) {
      const images = post.image.split(",");
      if (images.length > 0) {
        firstImage = images[0];
      }
    }

    return {
      id: post.id,
      userId: post.userId,
      title: post.title,
      image: firstImage,
    };
  });
  return modifiedPosts;
};

AU.prototype.getPostById = async (id) => {
  const post = await Auction.findByPk(id);
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
};

AU.prototype.searchPosts = async ({ title, content }) => {
  return await Auction.findAndCountAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${title}%` } },
        { content: { [Op.like]: `%${content}%` } },
      ],
    },
  });
};

AU.prototype.updatePost = async (
  id,
  { title, content, startPrice, bid, startTime, endTime }
) => {
  return await tbl_auction.update(
    { title, content, startPrice, bid, startTime, endTime },
    { where: { id: id } }
  );
};

module.exports = AU;
