const UuidV4 = (() => {
	const randomPool = new Uint8Array(16);
	/** @type {() => Uint8Array} */
	const rng = () => {
		if (!"crypto" in window) {
			throw new Error("Browser does not support crypto api");
		}
		return window.crypto.getRandomValues(randomPool);
	};
	/** @type {string[]} */
	const byteToHex = [].slice.call((() => {;
		let bth = [];
		for (let i = 0; i < 256; ++i) {
			bth.push((i + 0x100).toString(16).slice(1));
		}
		return bth;
	})());
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
	/** @type {() => string} */
	const uuidv4Fn = () => {
		let random = rng();
		// v4.4 spec
		random[6] = (random[6] & 0x0f) | 0x40;
		random[8] = (random[8] & 0x3f) | 0x80;
		return stringify(random);
	};
	const uuidv4Obj = {
		new: uuidv4Fn
	};
	return uuidv4Obj;
})();
