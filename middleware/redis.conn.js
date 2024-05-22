// redisClient.js
const redis = require("ioredis");
console.log();

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (err) => {
  console.error("Redis 에러:", err);
});

client.on("connect", () => {
  console.log("Redis에 성공적으로 연결되었습니다.");
});

module.exports = client;
