import { forceArray } from "@src/lib/common/forceArray";
import React from "react";
import { useStyletron } from "styletron-react";

interface IAlignHCenter {
    children: any;
}

const AlignHCenter: React.FC<IAlignHCenter> = function ({ children }: IAlignHCenter) {
    const [css] = useStyletron();
    const className = css({
        display: "flex",
        justifyContent: "center",
    });
    const elements = forceArray(children);
    return <div className={className}>{elements}</div>;
};

export default AlignHCenter;
