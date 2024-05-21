// Create a new object from the given object by picking only the specified keys.

const pick = <T extends Record<string, unknown>, k extends keyof T>(
	obj: T,
	keys: k[]
): Partial<T> => {
	const finalObj: Partial<T> = {};

	for (const key of keys) {
		if (obj && Object.hasOwnProperty.call(obj, key)) {
			finalObj[key] = obj[key];
		}
	}

	// returns A new object with only the specified keys

	return finalObj;
};

export default pick;
