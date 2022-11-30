import { Request, Response } from 'express';
import { storeMessage as SM, getMessages, deleteMessage as dMessage, getFirstMessage } from '../database/controllers/messages';
import axios, { Axios, AxiosResponse } from 'axios';
import { addMessageJob } from '../database/controllers/bull.controllers'; 

export const storeMessage = async (req: Request, res: Response): Promise<Response> => {
    try {
        addMessageJob(req.body);

        return res.status(200).json({ status: 'OK' }); 
    } catch (err) {
        console.error(err);
        return res.status(503).json({ status: 'error', error: err }); 
    }
};

export const firstStoredMessage = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({ status: 'ok', message: await getFirstMessage()});
};

export const messagesStored = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({ status: 'OK', messages: await getMessages() });
};

export const deleteMessage = async (req: Request, res: Response): Promise<Response> => {
    await dMessage();
    return res.status(200).json({ status: 'OK' })
};

export const sendMessage = async (message: any): Promise<boolean> =>{
    try {    
        axios('http://localhost:9000/test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            data: message
        }).then((response: AxiosResponse) => {
            if(response.status !== 200) return false;
        })
    } catch(err) {
        console.error(err);
        return false;
    };
    
    return true;
}