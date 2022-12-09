import app from '../app';
import redis from '../database/redis';
import configs from '../config/constants/configs';
import {Queue} from '../config/main';
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
  await Queue.isReady()
    .then(() => console.table({redis: { connection: 'OK'}}))
    .catch((e) => console.warn('can not connect to redis. ', e))
  Queue.process( async job => {
    console.log('inspected jobs')
    console.log(job.data);
    return;
  });
  
  Queue.on('complete', job => {
    console.info('Job', job, 'complete');
  })
});
/* redis.startConnection().then(() => 
).catch(err => {console.error("redis error: ", err); return;}); */