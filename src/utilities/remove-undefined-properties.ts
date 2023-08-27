export function removeUndefinedObjectProperties(obj: any): any {
    if (obj === null) {
        return obj;
    }

    if (typeof obj === 'object') {
        const newObject: any = {};
        let hasField = false;
        for (const i in obj) {
            if (obj[i] !== undefined) {
                hasField = true;
                const newVal = removeUndefinedObjectProperties(obj[i]);
                newObject[i] = newVal;
            }
        }
        if (!hasField) {
            return obj;
        }
        return newObject;
    }
    return obj;
}