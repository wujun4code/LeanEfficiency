export function randomString(size: number): string {
    if (size === 0) {
        throw new Error('Zero-length randomString is useless.');
    }
    let chars = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz' +
        '0123456789');
    let objectId = '';

    for (var i = 0; i < size; i++) {
        objectId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return objectId;
}

export function randomHexStringWithPrefix(prefix: string, size: number): string {
    return prefix + randomString(size);
}

export function newObjectId(): string {
    return randomString(10);
}

export function newToken(): string {
    return randomString(32);
}

export function newMobilePhoneNumber(): string {
    let prefix = ['138', '139', '188', '186', '189', '171', '170'];
    let chars = ('0123456789');
    let mobile = prefix[Math.floor(Math.random() * prefix.length)];
    for (let i = 0; i < 8; ++i) {
        mobile += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return mobile;
}
