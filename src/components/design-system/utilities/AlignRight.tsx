import { forceArray } from "@src/lib/common/forceArray";
import React from "react";
import { useStyletron } from "styletron-react";

interface IAlignRight {
    children: any;
    className?: string;
}

const AlignRight: React.FC<IAlignRight> = function ({ children, className }: IAlignRight) {
    const [css] = useStyletron();
    className = `${css({
        display: "flex",
        justifyContent: "flex-end",
    })} ${className ?? ""}`;
    const elements = forceArray(children);
    return <div className={className}>{elements}</div>;
};

export default AlignRight;
