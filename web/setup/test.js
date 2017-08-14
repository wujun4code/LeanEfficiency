const buf = Buffer.from([1, -2]);

console.log('buf', buf.toString());
// Prints: 1
console.log(buf.readUInt8(0));

// Prints: 254
console.log(buf.readUInt8(1));

// Throws an exception: RangeError: Index out of range
//console.log(buf.readUInt8(2));