var rxLeanCloud = require('rx-lean-js-core');
var RxAVObject = rxLeanCloud.RxAVObject;
var RxAVACL = rxLeanCloud.RxAVACL;

require('./appConfig');

var saRoleName = 'sa';

const builtInTags = [
    {
        name: '清秀',
        scope: 'app'
    },
    {
        name: '萝莉',
        scope: 'app'
    },
    {
        name: '苗条',
        scope: 'app'
    },
    {
        name: '御姐',
        scope: 'app'
    },
    {
        name: '熟练',
        scope: 'app'
    },
    {
        name: '技术',
        scope: 'app'
    },
];

const PBTagFields = {
    className: 'PBTag',
    name: 'name',
    scope: 'scope',
    valid: 'valid'
}

function initTags(params) {
    let tagObjs = [];

    let acl = new RxAVACL();
    acl.setPublicWriteAccess(false);
    acl.setWriteAccess(saRoleName, true);

    builtInTags.forEach(tag => {
        let obj = new RxAVObject(PBTagFields.className);
        obj.set(PBTagFields.name, tag.name);
        obj.set(PBTagFields.scope, tag.scope);
        obj.ACL = acl;
        tagObjs.push(obj);
    });
    RxAVObject.saveAll(tagObjs).subscribe(inited => {
        console.log('tags inited.');
    });
}
initTags();