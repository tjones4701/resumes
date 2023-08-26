import { useState } from "react";

export function useForceUpdate(): [number, () => void] {
    const [current, setCurrent] = useState(0);
    return [
        current,
        () => {
            setCurrent(current + 1);
        },
    ];
}
