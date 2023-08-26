import { uuid } from "@src/lib/uuid";
import { useEffect, useState } from "react";
import { MEDIA_SIZES } from "../styles/theme";

const mediaSizeTimers = {};

function getWindowWidth() {
    try {
        return window?.innerWidth;
    } catch (e) {
        return 0;
    }
}

function createWindowState() {
    const width = getWindowWidth();
    return {
        mobile: width <= MEDIA_SIZES.MOBILE,
        tablet: width <= MEDIA_SIZES.TABLET,
        desktop: width <= MEDIA_SIZES.DESKTOP,
        onlyMobile: width <= MEDIA_SIZES.MOBILE,
        onlyTablet: width < MEDIA_SIZES.DESKTOP && width > MEDIA_SIZES.MOBILE,
        onlyDesktop: width >= MEDIA_SIZES.DESKTOP,
    };
}

export function useMediaSize() {
    const id = uuid();

    const [state, setState] = useState(createWindowState());

    useEffect(() => {
        const handler = () => {
            if (window == null) {
                return;
            }

            let timer = mediaSizeTimers[id];
            if (timer != null) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                const newState = createWindowState();
                setState(newState);
            }, 100);

            mediaSizeTimers[id] = timer;
        };

        handler();
        window.addEventListener("resize", handler);

        return function () {
            window.removeEventListener("resize", handler);
        };
    }, []);

    return state;
}
