import { makeStyles } from "@fluentui/react-components";
import { Theme } from "@src/theme";
import * as React from "react";

const useStyles = makeStyles({
    container: {
        paddingLeft: "10vw",
        paddingRight: "10vw",
        paddingTop: "5vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    inner: {
        minHeight: "400px",
        minWidth: "300px",
        maxWidth: "500px",
        backgroundColor: "rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Theme.sizing.large,
        paddingBottom: Theme.sizing.large,
        paddingRight: Theme.sizing.large,
        paddingLeft: Theme.sizing.large,
    },
});

const Page: React.FC = function () {
    const { container, inner } = useStyles();

    return (
        <div className={container}>
            <div className={inner}>
                <h1>404 - Page Not Found</h1>
                <br />
            </div>
        </div>
    );
};

export default Page;
