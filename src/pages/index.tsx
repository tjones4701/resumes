import { useUser } from "@auth0/nextjs-auth0/client";
import { Button, Link } from "@fluentui/react-components";
import Container from "@src/components/design-system/Container";
import ContainerSection from "@src/components/design-system/ContainerSection";
import PublicLayout from "@src/layouts/public-layout";
import React from "react";

const UserWelcomeElement: React.FC<{ children: string }> = function ({ children }) {
    return (
        <>
            Welcome back {children},
            <br />
            <Link href="/app"><Button href="/app">Visit the app portal</Button>
            </Link>
        </>
    );
}

const Home: React.FC = function () {
    const { user } = useUser();
    const userName = user?.nickname ?? user?.name;
    const welcomeElement = userName ? <UserWelcomeElement>{userName}</UserWelcomeElement> : <></>;
    return (
        <PublicLayout>
            <Container>
                <ContainerSection>
                    <h1>Welcome to Resumes by Digital Ethos</h1>
                    {welcomeElement}
                </ContainerSection>
            </Container>
        </PublicLayout>
    );
};

export default Home;
