import app from '../app';
import redis from '../database/redis';
import configs from '../config/constants/configs';
import startQueue from '../config/main';
/**
 * Get port from environment and store in Express.
 */

let port = configs.GLOBAL.PORT;
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */
redis.startConnection().then(() => 
  app.listen(port, function() {
    console.log(`API Server started on port: ${port}`);
    startQueue();
  })
).catch(err => {console.error("redis error: ", err); return;});