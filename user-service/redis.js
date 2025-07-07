const Redis = require('ioredis');

const nodes = process.env.REDIS_NODES.split(',').map(hp => {
  const [host, port] = hp.split(':');
  return { host, port: parseInt(port, 10) };
});

const redis = new Redis.Cluster(nodes, {
  redisOptions: {
    password: process.env.REDIS_PASSWORD
  }
});

module.exports = redis;