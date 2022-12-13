import app from '../app';
import configs from '../config/constants/configs';
import { Queue, attemptRedisConnection } from '../config/bull';

/**
 * Get port from environment and store in Express.
 */

let port = configs.GLOBAL.PORT;
app.set('port', port);
/**
 * Listen on provided port, on all network interfaces.
 */
const main = async () => {
  if(await attemptRedisConnection()) {
    app.listen(port, async function() {
      console.log(`API Server started on port: ${port}`);
      
      await Queue.isReady()
        .then(() => console.table({redis: { connection: 'OK'}}));
      
      Queue.process( async job => {
/*         job.progress() */
        console.log(job.data);
        return;
      });
    });
  };
}

main();