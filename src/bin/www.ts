import app from '../app';
import configs from '../config/constants/configs';
import { Queue, attemptRedisConnection } from '../config/bull';
import axios from 'axios';

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
      
      Queue.process( job => {
        job.progress(50)
        processMessage(job.data);
        job.progress(100)
        return;
      });
    });
  };
}

const processMessage = (message: any) => {
  var data = JSON.stringify({
    "recipient_type": "individual",
    "to": `${message.job.contacts[0].wa_id}`,
    "type": "template",
    "template": {
      "namespace": "850afaa6_8e93_4dce_beef_66987dc63b60",
      "language": {
        "policy": "deterministic",
        "code": "ES_MX"
      },
      "name": "marketing_message_2022_11_28"
    }
  });
  
  var config = {
    method: 'post',
    url: 'https://waba.360dialog.io/v1/messages',
    headers: { 
      'D360-API-KEY': 'qqGS8jf4S8bLGMltF52CKgsqAK', 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .catch(function (error) {
    console.log(error);
  });
}

main();