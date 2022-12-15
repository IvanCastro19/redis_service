import { Queue } from '../../config/bull';

const options = {
    backoff: 5000,
    attempts: 10
};

export const addMessageJob = (message: any) => {
    return new Promise<boolean>( async (resolve, reject) => {
        let done: boolean = true;
        let error: string | null = null;

        Queue.add({ job: message }, options);
        Queue.on('error', (e: any) => {
            error = e;
            done = false;
        });

        setTimeout(() => {
            if(error)
                console.log(error)    
            
            resolve(done)
        }, 10);
    })
};