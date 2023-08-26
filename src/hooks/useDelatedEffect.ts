import { useEffect, useState } from "react";

/**
 * This function below behaves like a normal useEffect but will only return true if the latest promise finishes.
 * This means if the studentId changes and a request is already in progress it will cancel it and make another.
 * By cancelling and making another it means we won't event return the data from the previous student.
 * @param promise
 * @param deps
 */
const useDelayedEffect = (func: () => void, delay: number, deps: any = []): [any, boolean] => {
    const [state, setState]: [[any, boolean], any] = useState([null, true]);
    useEffect(() => {
        if (state?.[1] === true) {
            setState([state?.[0], true]);
        }

        const timeout = setTimeout(() => {
            setState([func(), true]);
        }, delay);

        return () => {
            clearTimeout(timeout);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return state;
};

export default useDelayedEffect;
