import { getQueryParams, objectToQueryString } from "@src/lib/browser/browser";
import { hashCheck } from "@src/lib/common/hash";
import { isArray } from "@src/lib/common/isArray";
import { removeNullProperties } from "@src/lib/common/removeNullProperties";
import { isString } from "@src/lib/isString";
import { useRouter } from "./useRouter";

export function useAlterQueryParams(): (params: any, clearExisting?: boolean, replace?: boolean) => void {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const alter = (params: any, clearExisting = false, replace) => {
        let queryParams = getQueryParams();
        if (hashCheck(queryParams, params)) {
            if (!clearExisting) {
                queryParams = { ...queryParams, ...params };
            }

            for (const i in queryParams) {
                const item = queryParams[i];
                if (isString(item) || isArray(item)) {
                    if (item?.length == 0) {
                        queryParams[i] = null;
                    }
                }
            }

            queryParams = removeNullProperties(queryParams);

            const pathName = router?.asPathOnly ?? "/";
            const newPath = `${pathName}?${objectToQueryString(queryParams)}`;
            router.navigate(newPath, replace);
        }
    };

    return alter;
}
