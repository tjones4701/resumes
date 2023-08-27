import Container from "@src/components/design-system/Container";
import ContainerHeader from "@src/components/design-system/ContainerHeader";
import ContainerSection from "@src/components/design-system/ContainerSection";
import { WithAuthenticedLayout } from "@src/layouts/authenticated-layout";
import React from "react";

const Home: React.FC = function () {
    return (
        <Container>
            <ContainerHeader level={1}>Resume Assistant</ContainerHeader>
            <ContainerSection>Todo</ContainerSection>
        </Container>
    );
};

export default WithAuthenticedLayout(Home);
