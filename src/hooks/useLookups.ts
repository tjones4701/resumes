import { fetchLookups } from "@src/lib/clientlink-api/lookups";
import { LookupTypeCodes, LookupValue } from "@src/lib/clientlink-api/types/Lookup";
import { useAsync } from "react-use";

export const useLookups = (
    code: LookupTypeCodes
): {
    loading: boolean;
    values: LookupValue[];
} => {
    const response = useAsync(async () => {
        const items = await fetchLookups(code);
        return items;
    }, [code]);

    return { loading: response.loading, values: response.value ?? [] };
};
