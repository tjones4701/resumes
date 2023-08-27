import { FluentProvider, makeStyles } from "@fluentui/react-components";
import { darkTheme } from "@src/theme/brownTheme";
import "./app.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const useStyles = makeStyles({
    pageContainer: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--colorNeutralBackground1)",
    },
    contentContainer: {
        paddingLeft: "5vw",
        paddingRight: "5vw",
        minHeight: "calc(100vh - 72px)",
    },
});

function MyApp({ Component, pageProps }: any) {
    const styles = useStyles();
    return (
        <UserProvider>
            <FluentProvider theme={darkTheme}>
                <div className={styles.pageContainer}>
                    <div>
                        <div className={styles.contentContainer}>
                            <Component {...pageProps} />
                        </div>
                    </div>
                </div>
            </FluentProvider>
        </UserProvider>
    );
}

export default MyApp;
