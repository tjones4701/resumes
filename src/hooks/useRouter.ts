import { NextRouter, useRouter as useNextRouter } from "next/router";

export type CustomNextRouter = NextRouter & {
    asPathOnly?: string;
    asQuery?: string;
    asHash?: string;
    navigate?: (url: string, replace?: boolean) => void;
    origin?: string;
};
export function useRouter(): CustomNextRouter {
    const router: CustomNextRouter = useNextRouter();
    if (router == null) {
        return null;
    }
    const fullPath = router?.asPath;

    // For below the order is important.
    let queryParts = fullPath?.split("?") ?? "";
    router.asPathOnly = queryParts?.[0] ?? "";
    queryParts = queryParts?.[1]?.split("#");
    router.asQuery = queryParts?.[0] ?? "";
    router.asHash = queryParts?.[1] ?? "";
    router.navigate = (url: string, replace = false) => {
        if (router.asPath != url) {
            if (replace) {
                router.replace(url, null, { shallow: true });
            } else {
                router.push(url, null, { shallow: true });
            }
        }
    };
    try {
        router.origin = window?.origin;
    } catch (e) {

    }

    return router;
}
