import { uuid } from "@src/lib/uuid";
import { useEffect, useState } from "react";

export function useUniqueId(deps: any[] = []): string {
    const [uniqueId, setUniqueId] = useState(null);

    useEffect(() => {
        setUniqueId(uuid());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return uniqueId;
}
