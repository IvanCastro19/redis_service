import { Router } from "express";
import { storeMessage } from '../controllers/redis.messages';

const route = Router();

route.post('/store_message', storeMessage)

export default route;