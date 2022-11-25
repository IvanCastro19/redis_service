import { createClient } from 'redis';
import logging from '../config/log/logging';
import configs from '../config/constants/configs';

const SERVER = 'SERVER';

export const client = createClient({url: configs.REDIS.URL});

export default class redis {
    static startConnection = () => {
        return new Promise<void>( async (resolve, reject) => {
            await client.connect().then(() => {
                logging.info(SERVER, 'Connected to Redis');
                resolve();
            }).catch(err => reject(err));
        })
    }
};