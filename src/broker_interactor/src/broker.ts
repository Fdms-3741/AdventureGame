import client, {Connection, Channel} from 'amqplib';

interface IBroker {
    /* Connects to the broker*/
    Connect: (connUrl:string) => Promise<boolean>;

    /* Holds connection */
    connection: Connection;
    /* Sets a channel for communication */
    channel: Channel;
    
    /* Sets the queue to send messages */
    queue: string;

    /*  */
    SetQueue: (content:string) => Promise<void>;

}

interface IBrokerSender extends IBroker {
    /* Sends something through a channel */
    Send: (content: string) => Promise<void>;
}


class BrokerSender implements IBrokerSender{
    channel!: Channel;
    _queue!: string;
    connection!: Connection;

    get queue(): string{
        return this._queue;
    };

    async SetQueue(queueName:string){
        this._queue = queueName;
        return new Promise<void>(async (resolve) => {await this.channel.assertQueue(this._queue); resolve()});
    }

    Send(content /* Connects to the broker*/: string){
        return new Promise<void>(async(resolve)=>{
            let attempts = 10;
            if(! this.channel.sendToQueue(this.queue,Buffer.from(content))){
                this.channel.on('drain',()=>{this.channel.sendToQueue(this.queue,Buffer.from(content))})
            }
            resolve();
        })
    };

    async Connect(connUrl: string){
        return new Promise<boolean>(async (resolve,reject)=>{
            this.connection = await client.connect(connUrl);
            this.connection.on('error',()=>{
                reject(false);
            })
            this.channel = await this.connection.createChannel();
            this.channel.on('error',()=>{
                reject(false);
            })
            resolve(true);
        })
    };
    

}

export {BrokerSender};