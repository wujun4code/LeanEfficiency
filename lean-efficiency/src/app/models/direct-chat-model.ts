import { IUIChatModelListItemModel, ChatCategory } from './ui-chat-model-list-item-model';

export class DirectChatModel implements IUIChatModelListItemModel {

    lastMessageSummary: string;

    set name(value: string) {
        this.peerName = value;
    }
    get name(): string {
        return this.peerName;
    }

    get category() {
        return ChatCategory.Direct;
    }

    set category(value) {

    }

    id: string;
    peerId: string;
    peerName: string;
    avatar: string;
}