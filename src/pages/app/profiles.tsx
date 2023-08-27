import Container from "@src/components/design-system/Container";
import ContainerHeader from "@src/components/design-system/ContainerHeader";
import ContainerSection from "@src/components/design-system/ContainerSection";
import { WithAuthenticedLayout } from "@src/layouts/authenticated-layout";
import { useResumeWSGet } from "@src/lib/webservices/app-webservice";
import React from "react";

const Home: React.FC = function () {

    const profiles = useResumeWSGet("PROFILES");
    console.log(profiles);

    return (
        <Container>
            <ContainerHeader level={1}>Profiles</ContainerHeader>
            <ContainerSection>

            </ContainerSection>
        </Container>
    );
};

export default WithAuthenticedLayout(Home);
