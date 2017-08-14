var randomBytes = require('crypto').randomBytes;
var createHash = require('crypto').createHash;
// Returns a new random hex string of the given even size.
function randomHexString(size) {
    if (size === 0) {
        throw new Error('Zero-length randomHexString is useless.');
    }
    if (size % 2 !== 0) {
        throw new Error('randomHexString size must be divisible by 2.')
    }

    return randomBytes(size / 2).toString('hex');
}

function randomHexStringWithPrefix(prefix, size) {
    return prefix + this.randomHexString(size);
}

// Returns a new random alphanumeric string of the given size.
//
// Note: to simplify implementation, the result has slight modulo bias,
// because chars length of 62 doesn't divide the number of all bytes
// (256) evenly. Such bias is acceptable for most cases when the output
// length is long enough and doesn't need to be uniform.
function randomString(size) {
    if (size === 0) {
        throw new Error('Zero-length randomString is useless.');
    }
    let chars = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz' +
        '0123456789');
    let objectId = '';
    let bytes = randomBytes(size);
    for (let i = 0; i < bytes.length; ++i) {
        objectId += chars[bytes.readUInt8(i) % chars.length];
    }
    return objectId;
}

function randomUpper(size) {
    if (size === 0) {
        throw new Error('Zero-length randomString is useless.');
    }
    let chars = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    let result = '';
    let bytes = randomBytes(size);
    for (let i = 0; i < bytes.length; ++i) {
        result += chars[bytes.readUInt8(i) % chars.length];
    }
    return result;
}

function randomNumberStr(size) {
    if (size === 0) {
        throw new Error('Zero-length randomString is useless.');
    }
    let chars = ('0123456789');
    let r = '';
    let bytes = randomBytes(size);
    for (let i = 0; i < bytes.length; ++i) {
        r += chars[bytes.readUInt8(i) % chars.length];
    }
    return r;
}

// Returns a new random alphanumeric string suitable for object ID.
function newObjectId() {
    //TODO: increase length to better protect against collisions.
    return this.randomString(10);
}

// Returns a new random hex string suitable for secure tokens.
function newToken() {
    return this.randomHexString(32);
}

function md5Hash(s) {
    return createHash('md5').update(s).digest('hex');
}

function newMobilePhoneNumber() {
    let prefix = ['138', '139', '188', '186', '189', '171', '170', '156', '151', '137'];
    let chars = ('0123456789');
    let mobile = prefix[Math.floor(Math.random() * prefix.length)];
    let bytes = randomBytes(8);
    for (let i = 0; i < bytes.length; ++i) {
        mobile += chars[bytes.readUInt8(i) % chars.length];
    }
    console.log('newMobilePhoneNumber', mobile);
    return mobile;
}

function format(s, ...args) {
    if (arguments.length == 0)
        return null;

    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}

var chineseFamilyNames =
    "赵 钱 孙 李 周 吴 郑 王 冯 陈 褚 卫\n" +
    "蒋 沈 韩 杨 朱 秦 尤 许 何 吕 施 张\n" +
    "孔 曹 严 华 金 魏 陶 姜 戚 谢 邹 喻\n" +
    "柏 水 窦 章 云 苏 潘 葛 奚 范 彭 郎\n" +
    "鲁 韦 昌 马 苗 凤 花 方 俞 任 袁 柳\n" +
    "酆 鲍 史 唐 费 廉 岑 薛 雷 贺 倪 汤\n" +
    "滕 殷 罗 毕 郝 邬 安 常 乐 于 时 傅\n" +
    "皮 卞 齐 康 伍 余 元 卜 顾 孟 平 黄\n" +
    "和 穆 萧 尹 姚 邵 湛 汪 祁 毛 禹 狄\n" +
    "米 贝 明 臧 计 伏 成 戴 谈 宋 茅 庞\n" +
    "熊 纪 舒 屈 项 祝 董 梁 杜 阮 蓝 闵\n" +
    "席 季 麻 强 贾 路 娄 危 江 童 颜 郭\n" +
    "梅 盛 林 刁 锺 徐 邱 骆 高 夏 蔡 田\n" +
    "樊 胡 凌 霍 虞 万 支 柯 昝 管 卢 莫\n" +
    "经 房 裘 缪 干 解 应 宗 丁 宣 贲 邓\n" +
    "郁 单 杭 洪 包 诸 左 石 崔 吉 钮 龚\n" +
    "程 嵇 邢 滑 裴 陆 荣 翁 荀 羊 於 惠\n" +
    "甄 麴 家 封 芮 羿 储 靳 汲 邴 糜 松\n" +
    "井 段 富 巫 乌 焦 巴 弓 牧 隗 山 谷\n" +
    "车 侯 宓 蓬 全 郗 班 仰 秋 仲 伊 宫\n" +
    "宁 仇 栾 暴 甘 钭 历 戎 祖 武 符 刘\n" +
    "景 詹 束 龙 叶 幸 司 韶 郜 黎 蓟 溥\n" +
    "印 宿 白 怀 蒲 邰 从 鄂 索 咸 籍 赖\n" +
    "卓 蔺 屠 蒙 池 乔 阳 郁 胥 能 苍 双\n" +
    "闻 莘 党 翟 谭 贡 劳 逄 姬 申 扶 堵\n" +
    "冉 宰 郦 雍 却 璩 桑 桂 濮 牛 寿 通\n" +
    "边 扈 燕 冀 僪 浦 尚 农 温 别 庄 晏\n" +
    "柴 瞿 阎 充 慕 连 茹 习 宦 艾 鱼 容\n" +
    "向 古 易 慎 戈 廖 庾 终 暨 居 衡 步\n" +
    "都 耿 满 弘 匡 国 文 寇 广 禄 阙 东";

var demoMiddleName = '小';

var chineseFemaleLetters = '筠、柔、竹、霭、凝、晓、欢、霄、枫、芸、菲、寒、伊、亚、宜、可、姬、舒、影、荔、枝、思、丽、秀、娟、英、华、慧、巧、美、娜、静、淑、惠、珠、翠、雅、芝、玉、萍、红、娥、玲、芬、芳、燕、彩、春、菊、勤、珍、贞、莉、兰、凤、洁、梅、琳、素、云、莲、真、环、雪、荣、爱、妹、霞、香、月、莺、媛、 艳、瑞、凡、佳、嘉、琼、桂、娣、叶、璧、璐、娅、琦、晶、妍、茜、秋、珊、莎、锦、黛、青、倩、婷、姣、婉、娴、瑾、颖、露、瑶、怡、婵、雁、蓓、纨、仪、荷、丹、蓉、眉、君、琴、蕊、薇、菁、梦、岚、苑、婕、馨、瑗、琰、韵、融、园、艺、咏、卿、聪、澜、纯、毓、悦、昭、冰、爽、琬、茗、羽、希、宁、欣、飘、育、滢、馥';

var chineseFemaleNames = `梦琪、忆柳、之桃、慕青、问兰、尔岚、元香、初夏、沛菡、傲珊、曼文、乐菱、痴珊、恨玉、惜文、香寒、新柔、语蓉、海安、夜蓉、涵柏、水桃、醉蓝、春儿、语琴、从彤、傲晴、语兰、又菱、碧彤、元霜、怜梦、紫寒、妙彤、曼易、南莲、紫翠、雨寒、易烟、如萱、若南、寻真、晓亦、向珊、慕灵、以蕊、寻雁、映易、雪柳、孤岚、笑霜、海云、凝天、沛珊、寒云、冰旋、宛儿、绿真、盼儿、晓霜、碧凡、夏菡、曼香、若烟、半梦、雅绿、冰蓝、灵槐、平安、书翠、翠风、香巧、代云、梦曼、幼翠、友巧、听寒、梦柏、醉易、访旋、亦玉、凌萱、访卉、怀亦、笑蓝、春翠、靖柏、夜蕾、冰夏、梦松、书雪、乐枫、念薇、靖雁、寻春、恨山、从寒、忆香、觅波、静曼、凡旋、以亦、念露、芷蕾、千兰、新波、代真、新蕾、雁玉、冷卉、紫山、千琴、恨天、傲芙、盼山、怀蝶、冰兰、山柏、翠萱、恨松、问旋、从南、白易、问筠、如霜、半芹、丹珍、冰彤、亦寒、寒雁、怜云、寻文、乐丹、翠柔、谷山、之瑶、冰露、尔珍、谷雪、乐萱、涵菡、海莲、傲蕾、青槐、冬儿、易梦、惜雪、宛海、之柔、夏青、亦瑶、妙菡、春竹、痴梦、紫蓝、晓巧、幻柏、元风、冰枫、访蕊、南春、芷蕊、凡蕾、凡柔、安蕾、天荷、含玉、书兰、雅琴、书瑶、春雁、从安、夏槐、念芹、怀萍、代曼、幻珊、谷丝、秋翠、白晴、海露、代荷、含玉、书蕾、听白、访琴、灵雁、秋春、雪青、乐瑶、含烟、涵双、平蝶、雅蕊、傲之、灵薇、绿春、含蕾、从梦、从蓉、初丹。听兰、听蓉、语芙、夏彤、凌瑶、忆翠、幻灵、怜菡、紫南、依珊、妙竹、访烟、怜蕾、映寒、友绿、冰萍、惜霜、凌香、芷蕾、雁卉、迎梦、元柏、代萱、紫真、千青、凌寒、紫安、寒安、怀蕊、秋荷、涵雁、以山、凡梅、盼曼、翠彤、谷冬、新巧、冷安、千萍、冰烟、雅阳、友绿、南松、诗云、飞风、寄灵、书芹、幼蓉、以蓝、笑寒、忆寒、秋烟、芷巧、水香、映之、醉波、幻莲、夜山、芷卉、向彤、小玉、幼南、凡梦、尔曼、念波、迎松、青寒、笑天、涵蕾、碧菡、映秋、盼烟、忆山、以寒、寒香、小凡、代亦、梦露、映波、友蕊、寄凡、怜蕾、雁枫、水绿、曼荷、笑珊、寒珊、谷南、慕儿、夏岚、友儿、小萱、紫青、妙菱、冬寒、曼柔、语蝶、青筠、夜安、觅海、问安、晓槐、雅山、访云、翠容、寒凡、晓绿、以菱、冬云、含玉、访枫、含卉、夜白、冷安、灵竹、醉薇、元珊、幻波、盼夏、元瑶、迎曼、水云、访琴、谷波、乐之、笑白、之山、妙海、紫霜、平夏、凌旋、孤丝、怜寒、向萍、凡松、青丝、翠安、如天、凌雪、绮菱、代云、南莲、寻南、春文、香薇、冬灵、凌珍、采绿、天春、沛文、紫槐、幻柏、采文、春梅、雪旋、盼海、映梦、安雁、映容、凝阳、访风、天亦、平绿、盼香、觅风、小霜、雪萍、半雪、山柳、谷雪、靖易、白薇、梦菡、飞绿、如波、又晴、友易、香菱、冬亦、问雁、妙春、海冬、半安、平春、幼柏、秋灵、凝芙、念烟、白山、从灵、尔芙、迎蓉、念寒、翠绿、翠芙、靖儿、妙柏、千凝、小珍、天巧。妙旋、雪枫、夏菡、元绿、痴灵、绮琴、雨双、听枫、觅荷、凡之、晓凡、雅彤、香薇、孤风、从安、绮彤、之玉、雨珍、幻丝、代梅、香波、青亦、元菱、海瑶、飞槐、听露、梦岚、幻竹、新冬、盼翠、谷云、忆霜、水瑶、慕晴、秋双、雨真、觅珍、丹雪、从阳、元枫、痴香、思天、如松、妙晴、谷秋、妙松、晓夏、香柏、巧绿、宛筠、碧琴、盼兰、小夏、安容、青曼、千儿、香春、寻双、涵瑶、冷梅、秋柔、思菱、醉波、醉柳、以寒、迎夏、向雪、香莲、以丹、依凝、如柏、雁菱、凝竹、宛白、初柔、南蕾、书萱、梦槐、香芹、南琴、绿海、沛儿、晓瑶、听春、凝蝶、紫雪、念双、念真、曼寒、凡霜、飞雪、雪兰、雅霜、从蓉、冷雪、靖巧、翠丝、觅翠、凡白、乐蓉、迎波、丹烟、梦旋、书双、念桃、夜天、海桃、青香、恨风、安筠、觅柔、初南、秋蝶、千易、安露、诗蕊、山雁、友菱、香露、晓兰、白卉、语山、冷珍、秋翠、夏柳、如之、忆南、书易、翠桃、寄瑶、如曼、问柳、香梅、幻桃、又菡、春绿、醉蝶、亦绿、诗珊、听芹、新之、易巧、念云、晓灵、静枫、夏蓉、如南、幼丝、秋白、冰安、秋白、南风、醉山、初彤、凝海、紫文、凌晴、香卉、雅琴、傲安、傲之、初蝶、寻桃、代芹、诗霜、春柏、绿夏、碧灵、诗柳、夏柳、采白、慕梅、乐安、冬菱、紫安、宛凝、雨雪、易真、安荷、静竹、代柔、丹秋、绮梅、依白、凝荷、幼珊、忆彤、凌青、之桃、芷荷、听荷、代玉、念珍、梦菲、夜春、千秋、白秋、谷菱、飞松、初瑶、惜灵、恨瑶、梦易、新瑶、曼梅、碧曼、友瑶、雨兰、夜柳、香蝶、盼巧、芷珍、香卉、含芙、夜云、依萱、凝雁、以莲、易容、元柳、安南、幼晴、尔琴、飞阳、白凡、沛萍、雪瑶、向卉、采文、乐珍、寒荷、觅双、白桃、安卉、迎曼、盼雁、乐松、涵山、恨寒、问枫、以柳、含海、秋春、翠曼、忆梅、涵柳、梦香、海蓝、晓曼、代珊、春冬、恨荷、忆丹、静芙、绮兰、梦安、紫丝、千雁、凝珍、香萱、梦容、冷雁、飞柏、天真、翠琴、寄真、秋荷、代珊、初雪、雅柏、怜容、如风、南露、紫易、冰凡、海雪、语蓉、碧玉、翠岚、语风、盼丹、痴旋、凝梦、从雪、白枫、傲云、白梅、念露、慕凝、雅柔、盼柳、半青、从霜、怀柔、怜晴、夜蓉、代双、以南、若菱、芷文、寄春、南晴、恨之、梦寒、初翠、灵波、巧春、问夏、凌春、惜海、亦旋、沛芹、幼萱、白凝、初露、迎海、绮玉、凌香、寻芹、秋柳、尔白、映真、含雁、寒松、友珊、寻雪、忆柏、秋柏、巧风、恨蝶、青烟、问蕊、灵阳、春枫、又儿、雪巧、丹萱、凡双、孤萍、紫菱、寻凝、傲柏、傲儿、友容、灵枫、尔丝、曼凝、若蕊、问丝、思枫、水卉、问梅、念寒、诗双、翠霜、夜香、寒蕾、凡阳、冷玉、平彤、语薇、幻珊、紫夏、凌波、芷蝶、丹南、之双、凡波、思雁、白莲、从菡、如容、采柳、沛岚、惜儿、夜玉、水儿、半凡、语海、听莲、幻枫、念柏、冰珍、思山、凝蕊、天玉、问香、思萱、向梦、笑南、夏旋、之槐、元灵、以彤、采萱、巧曼、绿兰、平蓝、问萍、绿蓉、靖柏。迎蕾、碧曼、思卉、白柏、妙菡、怜阳、雨柏、雁菡、梦之、又莲、乐荷、寒天、凝琴、书南、映天、白梦、初瑶、恨竹、平露、含巧、慕蕊、半莲、醉卉、天菱、青雪、雅旋、巧荷、飞丹、恨云、若灵、问萍、青蕾、雁云、芷枫、千旋、向梅、含蓝、怀丝、梦文、幼芙、晓云、雨旋、秋安、雁风、碧槐、从海、语雪、幼凡、秋卉、曼蕾、问蕾、访兰、寄莲、紫绿、新雁、恨容、水柳、南云、曼阳、幼蓝、忆巧、灵荷、怜兰、听曼、碧双、忆雁、夜松、映莲、听曼、秋易、绿莲、宛秋、雁安、问旋、以蓝、若亦、幻丝、山凡、南云、寄蕊、绿春、思海、寄天、友秋、紫玉、从筠、雪海、白筠、灵芙、安莲、惜梅、雪蕾、寄容、秋波、冷云、秋儿、怀菱、亦柏、易槐、怀卉、紫桃、向蕊、易青、千蕊、怜露、灵旋、怀梅、天柏、半白、碧安、秋枫、傲丝、春柔、冰岚、雅翠、易白、夜灵、静柔、醉绿、乐蕊、寄蓝、乐彤、迎琴、之亦、雨寒、谷山、凝安、曼萍、碧露、书南、山薇、念珊、芷雁、尔蕾、绮雪、傲萱、新琴、绿蝶、慕旋、怀易、傲云、晓梅、诗菱、灵珊、幻香、若云、如霜、晓晴、灵山、恨桃、梦凝、幻彤、觅波、慕玉、念山、乐桃、语寒、怀海、孤蝶、灵凝、慕蓝、紫青、千兰、孤柔、语曼、问海、寄筠、安露、听晴、冷寒、之翠、碧灵、凡丝、诗波、友芙、寄莲、之蕊、海琴、宛筠、半山、依槐、觅曼、碧菱、半文、访儿、芷珍、绿春、春蝶、怜槐、映露、雨卉、灵亦、惜莲、念菡、南凡、曼桃、笑灵、惜安、凌筠、翠菡、寒雁、以山、秋彤、巧兰、山雪、寒绿、忆易、依萱、如菡、含萱、惜梦、绮莲、翠易、冷筠、乐槐、傲青、幼灵、春柔、恨易、青文、初竹、从旋、沛山、映凝、静柳、雪云、醉蕊、巧荷、思蓝、翠秋、初双、雪旋、从霜、静萍、之彤、晓筠、含云、思兰、梦之、醉芙、若曼、寻槐、夜梅、访安、以绿、新柏、诗珊、灵青、幻菱、谷双、梦烟、凡烟、寻绿、香之、盼蕊、香筠、怀萱、半蓉、翠安、忆卉、念柏、念之、宛彤、如竹、天雪、念旋、笑萍、海风、小琴、乐海、易南、碧蕊、雁凝、雁风、依霜、天蝶、语凝、之卉、易云、若菡、幼兰、巧曼、以柳、小天、采雁、易莲、笑南、芷雁、觅霜、海柏、凝雪、诗晴、以梅、绮荷、乐山、又梦、听蓝、又彤、向竹、安琴、秋露、如波、尔槐、小易、静云、梦雪、幼凝、慕莲、如薇、静秋、幼柏、谷易、安芙、觅琴、冰槐、诗青、碧秋、从琴、从梦、寻风、凡薇、夜云、幼芙、以彤、怀云、幻柳、芷秋、以菱、靖柳、紫松、凡霜、灵云、采芙、亦露、香风、觅蓉、雨槐、又雪、碧蕾、香松、以亦、芷柔、千曼、友山、惜晴、幼文、寒波、友岚、乐槐、盼蝶、思山、以天、念梦、白桃、映翠、雁柳、翠灵、以竹、听雁、梦丝、冷烟、山露、安易、静霜、天珊、念蓝、书容、半晴、笑薇、孤萱、寄梦、秋蕊、从蝶、晓曼、半槐、绮易、访岚、含丝、慕安、怀雁、傲露、天岚、安寒、寻雪、幻旋、雁彤、天玉、亦珊、迎荷、慕柏、书柳、春海、初柏、绮翠、凝珍、海芙、尔香、问旋、紫之、灵翠、芷波、曼梦、向蕊、笑琴、映丝、妙筠、紫彤、妙曼、以阳、紫筠、易玉、梦蓝、谷露、曼春、寻枫、寻山、慕槐、凝绿、凝梅、醉文、听雪、以珊、友柳、孤珊、山芙、向凡、如巧、从彤、南翠、天凝`

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
}

Array.prototype.randomGroup = function () {

}
function randomFamilyName() {
    let fx = chineseFamilyNames.split("\n");
    let randomGroup = fx.random();
    let groupItems = randomGroup.split(" ");
    let result = groupItems.random();
    return result;
}

function randomLastName() {
    let last = chineseFemaleNames.split('、');
    return last.random().trim();
}
function randomLastLetter() {
    let letters = chineseFemaleLetters.split('、');
    return letters.random();
}
function randomPopularFemaleName() {
    let f = randomFamilyName();
    //let m = demoMiddleName;
    let l = randomLastName();
    return `${f}${l}`.trim();
}
function rundomReceptionName() {
    let f = randomFamilyName();
    return `${demoMiddleName}${f}`.trim();
}


// let ax = randomPopularFemaleName();
// console.log('ax', ax.trim());
module.exports = {
    newMobilePhoneNumber: newMobilePhoneNumber,
    randomPopularFemaleName: randomPopularFemaleName,
    randomUpper: randomUpper,
    rundomReceptionName: rundomReceptionName
}