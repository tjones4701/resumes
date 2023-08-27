import { forceArray } from "@src/lib/common/forceArray";
import React from "react";
import { useStyletron } from "styletron-react";

interface IAlignLeft {
    children: any;
    className?: string;
}

const AlignLeft: React.FC<IAlignLeft> = function ({ children, className }: IAlignLeft) {
    const [css] = useStyletron();

    className = `${css({
        display: "flex",
        justifyContent: "flex-start",
    })} ${className ?? ""}`;
    const elements = forceArray(children);
    return <div className={className}>{elements}</div>;
};

export default AlignLeft;
