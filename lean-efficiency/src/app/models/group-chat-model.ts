import { IUIChatModelListItemModel, ChatCategory } from './ui-chat-model-list-item-model';

export class GroupChannelModel implements IUIChatModelListItemModel {
    subUrl: string;
    lastMessageSummary: string;
    id: string;
    avatar: string;
    nameHex: string;
    name: string;
    get category() {
        return ChatCategory.GroupChannel;
    }

    set category(value) {

    }
}