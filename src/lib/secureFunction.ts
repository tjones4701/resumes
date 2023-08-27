import { Roles, hasRole } from "../user/user";

export function secureFunction<T = any[]>(role: Roles, func: (...args: T[]) => any): (...args: T[]) => any {
    if (!hasRole(role)) {
        return () => {
            return null;
        }
    }
    return func;
}