import { Spinner } from "@fluentui/react-components";
import Container from "@src/components/design-system/Container";
import ContainerHeader from "@src/components/design-system/ContainerHeader";
import ContainerSection from "@src/components/design-system/ContainerSection";
import FEInput from "@src/components/forms/Elements/FEInput";
import QuickForm from "@src/components/forms/QuickForm";
import { useRouter } from "@src/hooks/useRouter";
import { WithAuthenticedLayout } from "@src/layouts/authenticated-layout";
import { ResumeWS, useResumeWSGet } from "@src/lib/webservices/app-webservice";
import React, { useState } from "react";


const ProfileAssistant: React.FC = function (props) {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState("");
    const submitForm = async (data: any) => {
        setIsLoading(true);
        try {
            const aiProfileResponse = await ResumeWS("AI_PROFILE").post({
                user_summary: data?.user_summary
            });
            setResponse(aiProfileResponse?.getData());
        } catch (e) {
            console.warn(e);
        }
        setIsLoading(false);
    }
    console.log(response);
    return (
        <>
            <QuickForm loading={isLoading} disabled={isLoading} onSubmit={submitForm}>
                <FEInput label={"Tell us about yourself to create a profile."} type="textarea" name="user_summary" />
            </QuickForm>
            <hr />
        </>
    );
}

const Page: React.FC = function (props) {
    const { query } = useRouter();
    const profileId = query?.profileId?.toString();
    const isNew = profileId == "new";

    const { value: profile, loading } = useResumeWSGet(isNew ? undefined : "PROFILE", {
        profileId: profileId
    });

    if (loading) {
        return <Spinner />;
    }

    return (
        <Container>
            <ContainerHeader level={1}>Create New Profile</ContainerHeader>
            <ContainerSection>
                <ProfileAssistant />

            </ContainerSection>
        </Container>
    );
};

export default WithAuthenticedLayout(Page);
