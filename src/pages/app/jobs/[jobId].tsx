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
            const aiResponse = await ResumeWS("AI_JOB").post({
                job_summary: data?.job_summary
            });
            console.log(aiResponse);
            setResponse(aiResponse?.getData());
        } catch (e) {
            console.warn(e);
        }
        setIsLoading(false);
    }
    return (
        <>
            <QuickForm loading={isLoading} disabled={isLoading} onSubmit={submitForm}>
                <FEInput label={"Tell us about the job you are looking to apply for."} type="textarea" name="job_summary" />
            </QuickForm>
            <hr />
        </>
    );
}

const Page: React.FC = function (props) {
    const { query } = useRouter();
    const jobId = query?.jobId?.toString();
    const isNew = jobId == "new";

    const { value: item, loading } = useResumeWSGet(isNew ? undefined : "JOB", {
        id: jobId
    });

    if (loading) {
        return <Spinner />;
    }

    return (
        <Container>
            <ContainerHeader level={1}>Create New Job</ContainerHeader>
            <ContainerSection>
                <ProfileAssistant />

            </ContainerSection>
        </Container>
    );
};

export default WithAuthenticedLayout(Page);
