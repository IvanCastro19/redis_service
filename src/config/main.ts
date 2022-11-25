import { getFirstMessage, deleteMessage } from "../database/controllers/messages";
import { sendMessage } from "../controllers/messages.controller";

const main = () => {
    while (true) {
        setTimeout( async () => {
            try {
                const message: Object | null = await getFirstMessage();
                
                if(!message)
                    return;

                if(!await sendMessage(message))
                    return;

                await deleteMessage();

            } catch (err) {
                console.error(err);
                return;
            }
        }, 1000);
    }
}

export default main;