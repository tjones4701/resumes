export function uniqueArray(arr: any[], key: any = null) {
    if (arr == null) {
        return null;
    }
    const unique: any = {};
    for (const i in arr) {
        const item = arr[i];
        let itemKey = null;
        if (key != null) {
            itemKey = item?.[key];
        } else {
            itemKey = item;
        }
        unique[itemKey] = item;
    }

    return Object.values(unique);
}
