import app from '../app';
import redis from '../database/redis';
import configs from '../config/constants/configs';
import { Queue } from '../config/main';
/**
 * Get port from environment and store in Express.
 */

let port = configs.GLOBAL.PORT;
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */

app.listen(port, async function() {
  console.log(`API Server started on port: ${port}`);
  await Queue()
    .on('error', err => console.warn("Redis error: ", err));
  console.info('Redis connection done')
  });
/* redis.startConnection().then(() => 
).catch(err => {console.error("redis error: ", err); return;}); */