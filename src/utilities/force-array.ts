export function forceArray<T = unknown>(item: T | T[] | undefined): T[] {
    if (item == undefined) {
        return [];
    }
    if (!Array.isArray(item)) {
        return [item];
    }
    return item;
}
