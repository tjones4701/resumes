import { makeStyles } from "@fluentui/react-components";
import { Theme } from "@src/theme";
import React from "react";

export interface IContainerSection {
    children?: React.ReactNode;
    noPadding?: boolean;
    className?: string;
    role?: string;
    ariaLevel?: number;
}

const useStyles = makeStyles({
    stClassNameNoPadding: {
        paddingTop: "0px",
        paddingRight: "0px",
        paddingLeft: "0px",
        paddingBottom: "0px",
    },
    stClassName: {
        paddingTop: Theme.sizing.small,
        paddingRight: Theme.sizing.small,
        paddingLeft: Theme.sizing.small,
        paddingBottom: Theme.sizing.small,
    },
});

const ContainerSection: React.FC<IContainerSection> = ({ children, noPadding, className, role, ariaLevel }: IContainerSection) => {
    const { stClassNameNoPadding, stClassName } = useStyles();
    const elementClassName = `${noPadding ? stClassNameNoPadding : stClassName} ${className ?? ""} `;

    return (
        <div role={role} className={elementClassName} aria-level={ariaLevel}>
            {children}
        </div>
    );
};

export default ContainerSection;
