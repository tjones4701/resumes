import React, { useContext } from "react";

export const PrintContext = React.createContext(null);

export type IPrintContext = {
    business: any;
};

export const usePrintContext = (): IPrintContext => {
    return useContext(PrintContext);
};
