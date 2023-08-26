import React from "react";
import ContainerSection from "./ContainerSection";
import { Theme } from "@src/theme";
import { Text, makeStyles } from "@fluentui/react-components";

export interface IContainerHeader {
    children?: React.ReactNode;
    level?: number;
}

const useStyles = makeStyles({
    containerClassName: {
        paddingLeft: Theme.sizing.small,
        paddingRight: Theme.sizing.small,
        paddingBottom: Theme.sizing.xSmall,
        paddingTop: Theme.sizing.xSmall,
    },
});

const ContainerHeader: React.FC<IContainerHeader> = ({ children, level }: IContainerHeader) => {
    const { containerClassName } = useStyles();

    return (
        <ContainerSection className={containerClassName} ariaLevel={level}>
            <Text size={400} as={`h${level}` as any}>
                {children}
            </Text>
        </ContainerSection>
    );
};

export default ContainerHeader;
