export default function toJson(val: any): any {
    try {
        return JSON.parse(val);
    } catch (error: any) {
        return null;
    }
}
