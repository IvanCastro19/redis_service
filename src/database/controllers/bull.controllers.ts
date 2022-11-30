import { Queue } from '../../config/main';


export const addMessageJob = async (message: any) => {
    Queue().add({ message: message });
    return true;
};

export const handlerMessage = async () => {
    Queue().process((job) => {
        console.log(job);
    });
};