import Bull from 'bull';
import config from './constants/configs';
import { BullAdapter } from 'bull-board/bullAdapter';
import { createBullBoard } from 'bull-board';

const name: string = 'messages';

export const Queue = new Bull(name, config.REDIS.URL);

export const { router } = createBullBoard([
    new BullAdapter(Queue)
]);