import React from "react";
import { StyleObject, useStyletron } from "styletron-react";

type IVisuallyHidden = {
    children: any;
    show?: boolean;
};

const VisuallyHidden: React.FC<IVisuallyHidden> = function ({ show, children }: IVisuallyHidden) {
    const [css] = useStyletron();
    const properties: StyleObject = {};

    if (show !== true) {
        properties.display = "none";
    }

    const className = css(properties);

    return <div className={className}>{children}</div>;
};

export default VisuallyHidden;
