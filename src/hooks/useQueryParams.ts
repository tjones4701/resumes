import { getQueryParams } from "@src/lib/browser/browser";
import { isNonEmptyArray } from "@src/lib/common/inNonEmptyArray";
import { useRouter } from "./useRouter";

export function useQueryParams(params?: string[]): any {
    let { query } = useRouter();
    if (Object.keys(query ?? {}).length == 0) {
        query = getQueryParams();
    }

    if (isNonEmptyArray(params)) {
        const results = {};
        for (const i in params) {
            results[params[i]] = query?.[params[i]];
        }
        return results;
    } else {
        return { ...query };
    }
}
