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

module.exports = {
    newMobilePhoneNumber: newMobilePhoneNumber,
}