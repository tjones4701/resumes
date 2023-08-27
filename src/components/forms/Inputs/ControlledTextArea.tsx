
import { Textarea } from "@fluentui/react-components";
import * as React from "react";
import { Controller } from "react-hook-form";

export type IControlledTextAreaTypes = "password" | "textarea";
export type IControlledTextAreaSizes = "mini" | "default" | "compact" | "large";
export interface IControlledTextArea {
    control: any;
    name: string;
    placeholder: string;
    type?: IControlledTextAreaTypes;
    disabled: boolean;
    size?: IControlledTextAreaSizes;
    required?: boolean;
    className?: string;
}

const ControlledTextArea: React.FC<IControlledTextArea> = function ({ control, className, name, placeholder, disabled, size, required }: IControlledTextArea) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => {
                return (
                    <Textarea
                        className={className}
                        required={required}
                        disabled={disabled}
                        ref={ref as any}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value ?? ""}
                        name={name}
                        placeholder={placeholder}
                    />
                );
            }}
        />
    );
};

export default ControlledTextArea;
