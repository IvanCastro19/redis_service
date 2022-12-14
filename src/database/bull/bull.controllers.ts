import { Queue } from '../../config/bull';

const options = {
    backoff: 5000,
    attempts: 3
};

export const addMessageJob = (message: any) => {
    return new Promise<boolean>( async (resolve, reject) => {
        await Queue.add({ job: message }, options)
        Queue.on('error', (error: any) => {
            console.error(error);
            resolve(false);
        });
        resolve(true);
    })
};