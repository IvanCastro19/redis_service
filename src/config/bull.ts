import Bull from 'bull';
import config from './constants/configs';
import { BullAdapter } from 'bull-board/bullAdapter';
import { createBullBoard } from 'bull-board';

const name: string = 'messages';

export const Queue = new Bull(name, config.REDIS.URL);

export const { router } = createBullBoard([
    new BullAdapter(Queue)
]);

export const attemptRedisConnection = (): any => {
    return new Promise<boolean>(async (resolve) => {
        let error: string = '';
        Queue.on('error', (e: any) => {
            error = e;
        });

        setTimeout(() => {
            if(error === '') {
                resolve(true);
                return;
            }
            
            console.log('error at attempt Redis Connection: ', error);
            resolve(false);
        }, 1000);
    });
};
