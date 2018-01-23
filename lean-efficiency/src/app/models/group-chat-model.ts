import { IUIChatModelListItemModel, ChatCategory } from './ui-chat-model-list-item-model';
import { MessageModel } from './message-model';
import { Observable } from 'rxjs';
import { RxAVIMMessage, RxAVIMHistoryIterator } from 'rx-lean-js-core';

export class GroupChannelModel extends IUIChatModelListItemModel {
    get category() {
        return ChatCategory.GroupChannel;
    }

    set category(value) {

    }
    startReceive(obs: Observable<RxAVIMMessage>) {
        obs.subscribe(metaMessage => {
            let messageModel = new MessageModel();
            messageModel.fromRxAVIMMessage(metaMessage);
            this.messages.push(messageModel);
        });
    }
    initHistory(iterator: RxAVIMHistoryIterator) {
        iterator.previous(true).subscribe(avMessages => {
            this.messages = avMessages.map(m => {
                let messageModel = new MessageModel();
                messageModel.fromRxAVIMMessage(m);
                return messageModel;
            });
        });
    }
}