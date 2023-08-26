import { delayedFunction } from "@src/lib/delayedFunction";
import { useUniqueId } from "./useUniqueId";

/**
 * This function below behaves like a normal useEffect but will only return true if the latest promise finishes.
 * This means if the studentId changes and a request is already in progress it will cancel it and make another.
 * By cancelling and making another it means we won't event return the data from the previous student.
 * @param promise
 * @param deps
 */
const useDelayableFunction = () => {
    const id = useUniqueId();
    const func = (func: () => void, delay: number) => {
        delayedFunction(id, func, delay);
    };

    return func;
};

export default useDelayableFunction;
