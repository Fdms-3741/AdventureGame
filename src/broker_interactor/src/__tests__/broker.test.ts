import {BrokerSender} from '../broker';
import {RABBITMQ_HOST_ADDRESS} from '../default';

describe("Broker Sender",()=>{
    it("Send data",async() =>{
        /* Creates broker */
        let broker = new BrokerSender();

        /* Connects and initializes queue */
            await broker.Connect(RABBITMQ_HOST_ADDRESS);
            await broker.SetQueue("MISSION_UPDATE_CHARACTER");

            /* Attempts to send a message */
            let result = await broker.Send("Potato salad")
        expect(result).toBe(true);
    })
})