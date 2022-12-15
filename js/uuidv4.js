/**
 * @typedef UUIDV4
 * @type {object}
 * @property {() => Uint8Array} _rng
 * @property {(arr: Uint8Array) => string} _stringify
 * @property {() => string} new - Generates a new UUIDv4.
 */
/** @type {UUIDV4} */
const uuidv4 = (() => {
	/** @type {UUIDV4} */
	const uuidv4Obj = {};
	const randomPool = new Uint8Array(16);
	/** @type {() => Uint8Array} */
	const rng = () => {
		if (!"crypto" in window) {
			throw new Error("Browser does not support crypto api");
		}
		return window.crypto.getRandomValues(randomPool);
	};
	uuidv4Obj._rng = rng;
	/** @type {string[]} */
	const byteToHex = [];
	for (let i = 0; i < 256; ++i) {
		byteToHex.push((i + 0x100).toString(16).slice(1));
	}
	/** @type {(arr: Uint8Array) => string} */
	const stringify = (arr) => {
		return (
			byteToHex[arr[0]] +
			byteToHex[arr[1]] +
			byteToHex[arr[2]] +
			byteToHex[arr[3]] +
			"-" +
			byteToHex[arr[4]] +
			byteToHex[arr[5]] +
			"-" +
			byteToHex[arr[6]] +
			byteToHex[arr[7]] +
			"-" +
			byteToHex[arr[8]] +
			byteToHex[arr[9]] +
			"-" +
			byteToHex[arr[10]] +
			byteToHex[arr[11]] +
			byteToHex[arr[12]] +
			byteToHex[arr[13]] +
			byteToHex[arr[14]] +
			byteToHex[arr[15]]
		).toLowerCase();
	};
	uuidv4Obj._stringify = stringify;
	/** @type {() => string} */
	const uuidv4Fn = () => {
		let random = uuidv4Obj._rng();
		// v4.4 spec
		random[6] = (random[6] & 0x0f) | 0x40;
		random[8] = (random[8] & 0x3f) | 0x80;
		return uuidv4Obj._stringify(random);
	};
	uuidv4Obj.new = uuidv4Fn;
	return uuidv4Obj;
})();
