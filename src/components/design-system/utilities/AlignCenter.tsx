
import { makeStyles } from "@fluentui/react-components";
import { forceArray } from "@src/utilities/force-array";
import React from "react";

interface IAlignCenter {
    children: any;
}
const useStyles = makeStyles({
    alignCenter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
})

const AlignCenter: React.FC<IAlignCenter> = function ({ children }: IAlignCenter) {
    const { alignCenter } = useStyles();
    const elements = forceArray(children);
    return <div className={alignCenter}>{elements}</div>;
};

export default AlignCenter;
