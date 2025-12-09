const Redis = require("ioredis");
const redis = new Redis();

module.exports = {
  save: async (sessionId, role, text) => {
    await redis.rpush(sessionId, JSON.stringify({ role, text }));
  },
  get: async (sessionId) => {
    const msgs = await redis.lrange(sessionId, 0, -1);
    return msgs.map(m => JSON.parse(m));
  },
  clear: async (sessionId) => {
    await redis.del(sessionId);
  }
};
