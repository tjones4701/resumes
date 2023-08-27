import { Button, Link, Spinner, makeStyles } from "@fluentui/react-components";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import React, { useMemo } from "react";
import AlignCenter from "@src/components/design-system/utilities/AlignCenter";

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
    const { isLoading, user } = useUser();

    let inner: any = null;
    if (isLoading) {
        inner = <AlignCenter><Spinner /></AlignCenter>
    } else if (user == null) {
        inner = <AlignCenter><Link href="/api/auth/login">Click here to login</Link></AlignCenter>
    } else {
        inner = <>{children}</>;
    }

    return (
        <div className={content}>
            <div className={contentContainer}>
                <div className={container}>{inner}</div>
            </div>
        </div>
    );
};
function withAuthenticedLayout(Func: React.FC<any>) {
    return ({ ...props }) => {

        const inner = <Func {...props} />;

        return <AuthenticatedLayout>{inner}</AuthenticatedLayout>;
    }
}

export const WithAuthenticedLayout = withAuthenticedLayout;

export default AuthenticatedLayout;
