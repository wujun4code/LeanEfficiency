import { Observable } from 'rxjs';
import { MessageModel } from './message-model';

export class IUIChatModelListItemModel {
    avatar: string;
    lastMessageSummary: string;
    name: string;
    category: ChatCategory;
    id: string
    hexName: string;
    messages: MessageModel[];

    get unreadCount() {
        if (this.unread) {
            return this.unread.length;
        }
        return 0;
    }

    get unread() {
        if (this.messages) {
            return this.messages.filter(m => m.timestamp > this.lastReadAt);
        }
        return undefined;
    }


    get fixName() {
        if (this.name.length > 4 && this.unreadCount > 0) {
            return this.name.substring(0, 4) + '...';
        }
        return this.name;
    }

    markRead(timestamp?: number | Date, message?: MessageModel | string) {
        if (timestamp) {
            if (typeof timestamp == 'number') {
                this.lastReadAt = timestamp;
            } else if (timestamp instanceof Date) {
                this.lastReadAt = timestamp.getTime();
            }
        } else if (message) {
            if (message instanceof MessageModel) {
                this.lastReadAt = message.timestamp;
                this.lastReadMessageId = message.id;
            }
        } else {
            this.lastReadAt = new Date().getTime();
            if (this.messages)
                if (this.messages.length > 0) {
                    this.lastReadMessageId = this.messages[this.messages.length - 1].id;
                }
        }
    }

    lastReadAt: number;
    lastReadMessageId: string;
}

export enum ChatCategory {
    Direct = 1,
    GroupChat = 2,
    DiscussionGroup = 3,
    GroupChannel = 4,
    PubSubChannel = 5,
    ChatRoom = 6,
}