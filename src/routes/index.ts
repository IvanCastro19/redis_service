import { Router } from "express";
import { storeMessage, messagesStored, deleteMessage, firstStoredMessage } from '../controllers/messages.controller';

const route = Router();

route.post('/store_message', storeMessage)
    .get('/message', firstStoredMessage)
    .get('/messages', messagesStored)
    .delete('/deleteMessage', deleteMessage)

export default route;