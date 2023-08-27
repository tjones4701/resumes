
import { quickHash } from "@src/utilities/hash";
import { tryCall } from "@src/utilities/try-call";
import React, { useEffect } from "react";
import { QuickFormContext, useQuickForm } from "./useQuickForm";
import { Button, Spinner } from "@fluentui/react-components";
import { forceArray } from "@src/utilities/force-array";
import SpaceApart from "@src/components/design-system/utilities/SpaceApart";
import { useFormStyles } from "@src/components/forms/form-styles";

interface IQuickForm {
    children: any;
    readOnly?: boolean;
    submitText?: string;
    onSubmit?: (values: any, dirtyValues: any) => any;
    hideSubmit?: boolean;
    hideCancel?: boolean;
    onChange?: (key: string, value: any, formData: any) => void;
    cancelText?: string;
    onCancel?: () => any;
    defaultValues?: any;
    values?: any;
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
}

const QuickForm: React.FC<IQuickForm> = function ({
    children,
    submitText,
    onSubmit,
    defaultValues,
    hideSubmit,
    hideCancel,
    readOnly,
    cancelText,
    onChange,
    onCancel,
    values,
    disabled,
    loading,
    loadingText,
}: IQuickForm) {
    children = forceArray(children ?? []);

    const form = useQuickForm({ defaultValues: defaultValues, readOnly: readOnly, onChange: onChange });

    useEffect(() => {
        if (form != null) {
            if (values != null) {
                form.reset();
                form.setValues(values);
            }
        }
    }, [quickHash(values)]);

    form.disabled = disabled ?? false;
    form.loading = loading ?? false;

    const { defaultInputContainer } = useFormStyles();


    const onInnerSubmit = (vals: any) => {
        const dirtyValues: any = {};

        const existingValues = values ?? {};
        for (const i in vals) {
            if (vals[i] != existingValues[i]) {
                dirtyValues[i] = vals[i];
            }
        }

        tryCall(onSubmit, vals, dirtyValues);
    };

    const handleCancel = () => {
        tryCall(onCancel);
    };

    return (
        <QuickFormContext.Provider value={form as any}>
            {loading && <Spinner label={loadingText} />}
            <form onSubmit={form?.handleSubmit(onInnerSubmit)}>
                {children?.map((item: any, key: any) => {
                    const id = quickHash(item?.props);
                    return (
                        <div key={`${id}_${key}`} className={defaultInputContainer}>
                            {item}
                        </div>
                    );
                })}

                {!readOnly && (
                    <SpaceApart>
                        {!hideSubmit && (
                            <Button disabled={form?.disabled} size="small" type="submit">
                                {submitText ?? "Submit"}
                            </Button>
                        )}
                        {!hideCancel && cancelText != null && (
                            <Button onClick={handleCancel} disabled={form?.disabled} size="small" appearance="secondary">
                                {cancelText ?? "Cancel"}
                            </Button>
                        )}
                    </SpaceApart>
                )}
            </form>
        </QuickFormContext.Provider>
    );
};

export default QuickForm;
