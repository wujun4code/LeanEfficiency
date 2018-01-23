import { RxAVIMMessage } from 'rx-lean-js-core'

export class MessageModel {
    id: string;
    senderId: string;
    senderName: string;
    summary: string;
    content: any;
    timestamp: number;

    fromRxAVIMMessage(metaMessage: RxAVIMMessage) {
        this.id = metaMessage.id;
        this.senderId = metaMessage.from;
        this.timestamp = metaMessage.timestamp;
        let messageJson = metaMessage.toJson();
        if (Object.prototype.hasOwnProperty.call(messageJson, 'type')) {
            let mType = messageJson['type'];
            switch (mType) {
                case 'text': {
                    this.content = messageJson['text'];
                    break;
                }
                default: {
                    this.content = metaMessage.content;
                }
            }
        }
    }
}