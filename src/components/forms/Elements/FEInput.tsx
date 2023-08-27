import React from "react";
import { useQuickFormContext } from "../useQuickForm";
import { Label, makeStyles } from "@fluentui/react-components";
import ControlledInput from "../Inputs/ControlledInput";
import ControlledTextArea from "../Inputs/ControlledTextArea";
import Required from "../Inputs/Required";

export interface IFEInput {
    name: string;
    label?: React.ReactChild;
    placeholder?: string;
    type?: FEInputTypes;
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    hideOnReadOnly?: boolean;
}

export type FEInputTypes =
    | "text"
    | "textarea"
    | "phone"
    | "email"
    | "ndis"
    | "email"
    | "date"
    | "dob"
    | "lookup"
    | "password"
    | "number"
    | "time"
    | "medicare"
    | "datetime"
    | "checkbox";

const typeMappings: any = {
    dob: "date",
    date: "date",
    password: "password",
    number: "number",
    time: "time",
    yesno: "checkbox",
};

const useStyles = makeStyles({
    formInput: {
        width: "100%"
    }
});

const FEInput: React.FC<IFEInput> = function ({ disabled, name, placeholder, type, label, required, readOnly, hideOnReadOnly }: IFEInput) {
    const styles = useStyles();
    const context = useQuickFormContext();
    const control = context.control;
    name = name ?? "";
    if (context.readOnly || readOnly) {
        if (hideOnReadOnly) {
            return <></>;
        }
        const value = context?.getValue(name);
        return (
            <>
                <Label>{label}</Label>
                {value}
            </>
        );
    } else {
        const elementType = typeMappings[type ?? ""];

        let ControlledElement: any = ControlledInput;
        if (type == "textarea") {
            ControlledElement = ControlledTextArea;
        }
        return (
            <>
                <label htmlFor={name}>
                    {label} {required && <Required />}
                </label>

                <ControlledElement
                    className={styles.formInput}
                    required={required}
                    disabled={disabled || context.disabled}
                    control={control}
                    name={name}
                    placeholder={placeholder}
                    type={elementType}
                />
            </>
        );
    }
};

export default FEInput;
