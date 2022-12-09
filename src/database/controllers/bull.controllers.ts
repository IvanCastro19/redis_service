import { Queue } from '../../config/main';

const options = {
    delay: 1000,
    attempts: 3
};

export const addMessageJob = (message: any) => {
    return new Promise<boolean>( async (resolve, reject) => {
        console.log('adding job to queue')
        await Queue.add({ message: message }, options)
/*         Queue.on('error', (error, errorMessage) => {

        }) */
        resolve(true);
    })
};

export const handlerMessage = async () => {
    Queue.process((job) => {
        console.log(job);
    });
};