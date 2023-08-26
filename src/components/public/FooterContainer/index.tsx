import { makeStyles } from "@fluentui/react-components";
import Footer from "@src/components/public/Footer";
import React from "react";

interface IAppLayout {
    children: any;
}
const useStyles = makeStyles({
    containerStyle: {
        display: "flex",
        minHeight: "100vh",
        justifyContent: "space-between",
        flexDirection: "column",
    },
});

const FooterLayout: React.FC<IAppLayout> = function ({ children }: IAppLayout) {
    const { containerStyle } = useStyles();
    return (
        <div className={containerStyle}>
            <div>{children}</div>
            <Footer />
        </div>
    );
};

export default FooterLayout;
