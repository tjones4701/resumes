
import { Input } from "@fluentui/react-components";
import * as React from "react";
import { Controller } from "react-hook-form";

export type IControlledInputTypes = "password" | "date";
export type IControlledInputSizes = "mini" | "default" | "compact" | "large";
export interface IControlledInput {
    control: any;
    name: string;
    className: string;
    placeholder: string;
    type?: IControlledInputTypes;
    disabled: boolean;
    required?: boolean;
}

const ControlledInput: React.FC<IControlledInput> = function ({ control, className, name, placeholder, type, disabled, required }: IControlledInput) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => {
                if (type == "date") {
                    // value = momentFormat.toDateOrNull(value) ?? "";
                }
                return (
                    <Input
                        className={className}
                        appearance="underline"
                        required={required}
                        disabled={disabled}
                        ref={ref as any}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value ?? ''}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                    />
                );
            }}
        />
    );
};

export default ControlledInput;
