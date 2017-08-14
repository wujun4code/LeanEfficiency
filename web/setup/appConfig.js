var rxLeanCloud = require('rx-lean-js-core');
var RxAVObject = rxLeanCloud.RxAVObject;
var RxAVApp = rxLeanCloud.RxAVApp;
var RxAVClient = rxLeanCloud.RxAVClient;

let app = new RxAVApp({
    appId: `1kz3x4fkhvo0ihk967hxdnlfk4etk754at9ciqspjmwidu1t`,
    appKey: `14t4wqop50t4rnq9e99j2b9cyg51o1232ppzzc1ia2u5e05e`
});

RxAVClient.init({
    log: true
}).add(app);

