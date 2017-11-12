import { Observable } from 'rxjs';

export interface IUIChatModelListItemModel {
    avatar: string;
    lastMessageSummary: string;
    name: string;
    category: ChatCategory;
    id: string
    subUrl: string;
}

export enum ChatCategory {
    Direct = 1,
    GroupChat = 2,
    DiscussionGroup = 3,
    GroupChannel = 4,
    PubSubChannel = 5,
    ChatRoom = 6,
}