export const Relation_Team_User_Keys = {
    className: 'Team_User',
    keys: {
        user: 'user',
        team: 'team'
    }
};

export const Relation_Team_Conversation = {
    className: 'Team_Conversation',
    keys: {
        team: 'team',
        conversation: 'conv',
        category: 'category',
        scope: 'scope'
    }
};

export const Relation_User_Conversation = {
    className: 'User_Conversation',
    keys: {
        conversation: 'conv',
        user: 'user',
        team: 'team'
    }
}