const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 30000;
var async = require("async");

//const Redis = require('ioredis')
//const redis = new Redis()


const redis_redis = require("redis");



async function subscribeStream(stream, socket) {
  let lastID = '$'

  const reply = await redis.xread('BLOCK', '5000', 'COUNT', 100, 'STREAMS', stream, lastID)
  if (reply) {
    const results = reply[0][1]
    const { length } = results
    if (results.length) {
      socket.emit("message", results);
      console.log(results.length);

      lastID = results[length - 1][0]
    }
  }


}


io.on("connection", socket => {
  console.log("a user connected :D");
  //subscribeStream("stream-a", socket);
  var subscriber = redis_redis.createClient();
  subscriber.subscribe("stream-a");

  //subscribe to the redis channel
  subscriber.on("message", function (channel, message) {
    var msg = JSON.parse(message);
    // only forward one specific sensor
    if (msg.name === 'wWert2303') {
      socket.emit("message", msg);
    }
  });


});

server.listen(port, () => console.log("server running on port:" + port));