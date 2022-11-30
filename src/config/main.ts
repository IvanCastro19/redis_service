import Bull from 'bull';
import config from './constants/configs';

const name: string = 'messages';

export const Queue = () => new Bull(name, {
    redis: { host: config.REDIS.HOST, port: parseInt(config.REDIS.PORT) }
});

