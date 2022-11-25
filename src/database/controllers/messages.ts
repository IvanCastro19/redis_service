import { client } from '../../database/redis';
import { sendMessage } from '../../controllers/messages.controller';

const kname: string = 'messages'

export const storeMessage = (message: any) => { 
    return new Promise<boolean>( async (resolve, reject) => {
        try {
            const response = await client.rPush(kname, JSON.stringify(message));
            
            if(!response)
                resolve(false);
            
            resolve(true);
        } catch (err) {
            reject(err);
        };
    })
}

export const getMessages = () => {
    return new Promise<string[] | null>(async (resolve, reject) =>{
        try {
            const messages_string: string[] | null = await client.lRange(kname, 0, -1);
            
            if(!messages_string)
                resolve(messages_string)

            const jsonMessage = messages_string.map(message => JSON.parse(message));
            
            resolve(jsonMessage);
        } catch (err) {
            console.error(err);
            resolve(null);
        }
    })
};

export const getFirstMessage = () => {
    return new Promise<Object | null>(async (resolve, reject) =>{
        try {
            const message_string: string[] | null = await client.lRange(kname, 0, 0);
            
            if(!message_string)
                resolve(message_string)

             const jsonMessage = message_string.map(message => JSON.parse(message));;
            
            resolve(jsonMessage);
        } catch (err) {
            console.error(err);
            resolve(null);
        }
    })
};

export const deleteMessage = () => {
    return new Promise<void>(async(resolve, reject) => {
        await client.lPop(kname);
        resolve();
    });
};