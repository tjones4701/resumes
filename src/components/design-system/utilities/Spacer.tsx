import React from "react";
import { useStyletron } from "styletron-react";

type Spacers = 4 | 8 | 16 | 32;
type IAlignRight = {
    top?: Spacers;
    left?: Spacers;
    right?: Spacers;
    bottom?: Spacers;
    x?: Spacers;
    y?: Spacers;
};

const Spacer: React.FC<IAlignRight> = function ({ top, left, right, bottom, x, y }: IAlignRight) {
    const [css] = useStyletron();
    const leftAmount = left ?? x;
    const rightAmount = right ?? x;
    const topAmount = top ?? y;
    const bottomAmount = bottom ?? y;

    const properties = {
        top: topAmount + "px",
        left: leftAmount + "px",
        right: rightAmount + "px",
        bottom: bottomAmount + "px",
        width: "100%",
        display: "inline-block",
    };

    const className = css(properties);

    return <div className={className}></div>;
};

export default Spacer;
