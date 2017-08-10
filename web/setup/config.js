const memberCommonProperties =
    [{
        objectName: 'PBMember',
        propertyName: 'nickName',
        description: '成员的昵称，团队内可见',
        propertyType: 'string',
        placeholder: 'nickName',
        category: 'member',
        subCategory: 'member',
        icon: 'account_circle',
        scope: 'app',
    }, {
        objectName: 'PBMember',
        propertyName: 'serial',
        description: '成员的编号，团队内可见',
        propertyType: 'string',
        placeholder: 'serial',
        category: 'member',
        subCategory: 'member',
        icon: 'domain',
        scope: 'app',
    }, {
        objectName: 'PBMember',
        propertyName: 'mobile',
        description: '成员的手机号，团队内可见',
        propertyType: 'string',
        placeholder: 'mobile',
        category: 'member',
        subCategory: 'member',
        icon: 'call',
        scope: 'app',
    }, {
        objectName: 'PBMember',
        propertyName: 'weixin',
        description: '成员的微信号，团队内可见',
        propertyType: 'string',
        placeholder: 'weixin',
        category: 'member',
        subCategory: 'member',
        icon: 'chat_bubble',
        scope: 'app',
    }];

const technicianBuiltInProperties = [
    {
        objectName: 'PBMember',
        propertyName: 'affiliation',
        description: '技师的归属接待',
        propertyType: 'Pointer',
        placeholder: 'affiliation',
        category: 'member',
        subCategory: 'member-technician',
        icon: 'group',
        scope: 'app',
    },
];

const PBPropertyFields = {
    className: 'PBProperty',
    objectName: 'objectName',
    propertyName: 'propertyName',
    description: 'description',
    propertyType: 'propertyType',
    placeholder: 'placeholder',
    category: 'category',
    subCategory: 'subCategory',
    icon: 'icon',
    scope: 'scope',
    valid: 'valid'
}

module.exports = {
    PBPropertyFields: PBPropertyFields,
    memberCommonProperties: memberCommonProperties,
    technicianBuiltInProperties: technicianBuiltInProperties,
}