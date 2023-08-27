import { forceArray } from "@src/lib/common/forceArray";
import React from "react";
import { useStyletron } from "styletron-react";

interface IAlignVCenter {
    children: any;
}

const AlignVCenter: React.FC<IAlignVCenter> = function ({ children }: IAlignVCenter) {
    const [css] = useStyletron();
    const className = css({
        display: "flex",
        alignItems: "center",
    });
    const elements = forceArray(children);
    return <div className={className}>{elements}</div>;
};

export default AlignVCenter;
