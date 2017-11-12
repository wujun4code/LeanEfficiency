import { IUIChatModelListItemModel, ChatCategory } from './ui-chat-model-list-item-model';

export class DirectChatModel implements IUIChatModelListItemModel {

    lastMessageSummary: string;

    set name(value: string) {
        this.textName = value;
    }
    get name(): string {
        return this.textName;
    }

    get category() {
        return ChatCategory.Direct;
    }

    set category(value) {

    }

    set subUrl(value: string) {

    }
    get subUrl() {
        return '@' + this.hexPeerId;
    }

    get id() {
        return this.convId;
    }
    set id(value: string) {
        this.convId = value;
    }

    /**
     * 私聊对应的 _Conversation 的 object id
     * 
     * @type {string}
     * @memberof DirectChatModel
     */
    convId: string;

    /**
     * @ 某人的时候需要 @ 这货的 hex 格式的字符串 id，例如 @hjiang 
     * 它的作用是在页面跳转的时候，想从外部直接跳转到与某一个人的私聊的时候，直接输入 /message/@hjiang 就可以直接进去私聊
     * 
     * @type {string}
     * @memberof DirectChatModel
     */
    hexPeerId: string;

    /**
     * 私聊对象自己的昵称，类似于 QQ 昵称，注意区别与 markName
     * 
     * @type {string}
     * @memberof DirectChatModel
     */
    textName: string;

    avatar: string;
}