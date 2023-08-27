import { quickHash } from "@src/utilities/hash";
import React, { useContext, useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

export const QuickFormContext = React.createContext(null);

export type IQuickFormContext = UseFormReturn & {
    getValue: (key: string) => any;
    setValue: (key: string, value: any) => void;
    setValues: (data: { [key: string]: any } | undefined | null) => void;
    disabled: boolean;
    loading: boolean;
    readOnly: boolean;
    reset?: () => void;
    hash: any;
};

interface IUseQuickForm {
    defaultValues?: any;
    readOnly?: boolean;
    loading?: boolean;
    disabled?: boolean;
    onChange?: (id: string, value: any, formData: any) => any;
}

export const useQuickForm = ({ defaultValues, readOnly, loading, disabled, onChange }: IUseQuickForm): IQuickFormContext => {
    const form: any = useForm({ defaultValues: defaultValues });
    const [formDataHash, setFormDataHash] = useState<number | null>(null);

    if (form != null) {
        form.watch((formData: any, event: any) => {
            if (onChange != null) {
                onChange(event.name, event.value ?? formData[event?.name], formData);
            }
            setFormDataHash(quickHash(formData));
        });
    }

    form.disabled = disabled;
    form.loading = loading;
    form.readOnly = readOnly;
    form.hash = formDataHash;
    form.setValues = (data: { [key: string]: any }) => {
        for (const i in data) {
            form?.setValue(i, data[i]);
        }
    };

    form.getValue = (elementName: string) => {
        return form?.getValues(elementName) ?? null;
    };

    useEffect(() => {
        form.setValues(defaultValues);
    }, []);

    return { ...form };
};

export const useQuickFormContext = (): IQuickFormContext => {
    return useContext(QuickFormContext) as any;
};
