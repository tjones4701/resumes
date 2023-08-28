export default function toJson<T = unknown, B = T>(val: string | undefined | null, def: B): T | B {
    if (val == null) {
        return def;
    }
    try {
        return JSON.parse(val);
    } catch (error: any) {
        return def;
    }
}
