import { makeStyles } from "@fluentui/react-components";
import FooterLayout from "@src/components/public/FooterContainer";
import React from "react";

interface IAppLayout {
    children: any;
}

const useStyles = makeStyles({
    container: {
        paddingLeft: "4vw",
        paddingRight: "4vw",
        paddingTop: "clamp(20px,5vh, 40px)",
        paddingBottom: "clamp(20px,5vh, 120px)",
        maxWidth: "1600px",
        marginRight: "0",
        marginLeft: "0",
        marginBottom: "auto",
        marginTop: "auto",
    },
    content: {
        display: "initial",
    },
    contentContainer: {
        paddingTop: `10px`,
    },
});

const AuthenticatedLayout: React.FC<IAppLayout> = function ({ children }: IAppLayout) {
    const { content, contentContainer, container } = useStyles();
    const padding = "4vw";

    return (
        <div className={content}>
            <div className={contentContainer}>
                <div className={container}>{children}</div>
            </div>
        </div>
    );
};

export default AuthenticatedLayout;
