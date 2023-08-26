import { Client } from "@src/lib/clientlink-api/types/Client";
import React, { useContext } from "react";

export const ClientContext = React.createContext(null);

export type IClientContext = {
    client: any;
    reload: () => Promise<void>;
    update: (data: Client) => void;
};

export const useClientContext = (): IClientContext => {
    const context = useContext(ClientContext);

    return context;
};
