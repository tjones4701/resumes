import Container from "@src/components/design-system/Container";
import ContainerSection from "@src/components/design-system/ContainerSection";
import PublicLayout from "@src/layouts/public-layout";
import React from "react";

const Home: React.FC = function () {
    return (
        <PublicLayout>
            <Container>
                <ContainerSection>
                    <h1>Welcome to Resumes by Digital Ethos</h1>
                    <p></p>
                </ContainerSection>
            </Container>
        </PublicLayout>
    );
};

export default Home;
