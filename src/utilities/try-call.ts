export async function tryCall(func: any, ...params: any[]) {
    if (typeof func === "function") {
        return func(...params);
    }
}
