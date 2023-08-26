import Container from "@src/components/design-system/Container";
import ContainerHeader from "@src/components/design-system/ContainerHeader";
import ContainerSection from "@src/components/design-system/ContainerSection";
import AuthenticatedLayout from "@src/layouts/AuthenticatedLayout";
import PublicLayout from "@src/layouts/public-layout";
import React from "react";

const Home: React.FC = function () {
    return (
        <AuthenticatedLayout>
            <Container>
                <ContainerHeader level={1}>Resume Assistant</ContainerHeader>
                <ContainerSection>Todo</ContainerSection>
            </Container>
        </AuthenticatedLayout>
    );
};

export default Home;
