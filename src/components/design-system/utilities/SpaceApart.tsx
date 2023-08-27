
import { makeStyles } from "@fluentui/react-components";
import { forceArray } from "@src/utilities/force-array";
import React from "react";

interface ISpaceApart {
    children: any;
    noWrap?: boolean;
}

const useStyles = makeStyles({
    spaceApart: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center",
    },
    spaceApartNoWrap: {
        flexWrap: "nowrap",
    },
});

const SpaceApart: React.FC<ISpaceApart> = function ({ children, noWrap }: ISpaceApart) {
    const { spaceApart, spaceApartNoWrap } = useStyles();
    const className = `${spaceApart} ${noWrap ? spaceApartNoWrap : ""}`;
    const elements = forceArray(children);
    return <div className={className}>{elements}</div>;
};

export default SpaceApart;
