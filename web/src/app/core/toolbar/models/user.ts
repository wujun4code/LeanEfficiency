export class ToolBarUserModel {
    id: string;
    nameText: string;
    actions: Array<ActionModel>;
}

export class ActionModel {
    actionText: string;
    icon: string;
    action: Function;
}