import { useClientOnly } from "@src/hooks/useClientOnly";
import React from "react";

interface IClientOnly {
    children: any;
    ssr?: any;
}

const ClientOnly: React.FC<IClientOnly> = function ({ children, ssr }: IClientOnly) {
    const isClient = useClientOnly();

    if (isClient) {
        return <>{children}</>;
    } else {
        return <>{ssr}</> ?? <div></div>;
    }
};

export default ClientOnly;
