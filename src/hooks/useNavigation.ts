import { useRouter } from "./useRouter";

export function useNavigation() {
    const router = useRouter();
    return router.navigate;
}
