import { Request, Response } from 'express';
import { addMessageJob } from '../database/bull/bull.controllers';

export const storeMessage = async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.contacts || !req.body.contacts[0].wa_id || req.body.contacts[0].wa_id.length < 13 || !req.body.messages[0])
        return res.status(400).json({status: 'error', message: 'No data provided'});
        
    try {
        if(await addMessageJob(req.body))
            return res.status(200).json({ status: 'OK' });
        
        return res.status(503).json({status: 'Internal Server Error'});
    } catch (err) {
        console.error(err);
        return res.status(503).json({ status: 'error', error: err }); 
    }
};