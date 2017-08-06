var rxLeanCloud = require('rx-lean-js-core');
var RxAVRole = rxLeanCloud.RxAVRole;
var RxAVUser = rxLeanCloud.RxAVUser;
var RxAVACL = rxLeanCloud.RxAVACL;

require('./appConfig');
var saRoleName = 'sa';
var password = 'PBp@ssw0rd';
function initSA() {
    let sa = new RxAVUser();
    sa.username = 'sa';
    sa.password = password;

    sa.signUp().flatMap(saSignUped => {
        let saRole = new RxAVRole();
        saRole.name = saRoleName;

        let saRoleACL = new RxAVACL();
        saRoleACL.setPublicWriteAccess(false);
        saRoleACL.setWriteAccess(sa, true);

        saRole.ACL = saRoleACL;
        return saRole.save();
    }).subscribe(saRoleInited => {
        console.log('saRoleInited', saRoleInited);
    });
}
initSA();