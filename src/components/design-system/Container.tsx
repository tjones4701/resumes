import { makeStyles } from "@fluentui/react-components";
import { Theme } from "@src/theme";
import React from "react";

export interface IContainer {
    id?: string;
    children?: React.ReactNode;
    elevation?: 1 | 2 | 3 | 4;
    className?: string;
}

const useStyles = makeStyles({
    container: {
        ...(Theme.border.all("border300") as any),
    },
});

const elevations = [null, "shadow400", "shadow500", "shadow600", "shadow700"];

const Container: React.FC<IContainer> = ({ children, id, elevation, className }: IContainer) => {
    const styles = useStyles();
    return (
        <div id={id} className={`${styles.container} ${className ?? ""}`}>
            {children}
        </div>
    );
};

export default Container;
