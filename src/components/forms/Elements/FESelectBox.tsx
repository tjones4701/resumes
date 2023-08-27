
import React from "react";
import ControlledSelectBox, { IControlledSelectSizes, IControlledSelectItem } from "../Inputs/ControlledSelectBox";
import { useQuickFormContext } from "../useQuickForm";
import Detail from "../detail";

export interface IFESelect {
    label?: React.ReactChild;
    name: string;
    disabled?: boolean;
    size?: IControlledSelectSizes;
    items: IControlledSelectItem[];
    multi?: boolean;
    required?: boolean;
    readOnly?: boolean;
}

const FESelect: React.FC<IFESelect> = function ({ disabled, readOnly, name, label, items, size, multi, required }: IFESelect) {
    const context = useQuickFormContext();
    const control = context?.control;
    if (context?.readOnly || readOnly) {
        const value = context?.getValue(name);
        return <Detail label={label}>{value}</Detail>;
    } else {
        return (
            <>
                <label htmlFor={name}>{label}</label>
                <ControlledSelectBox
                    required={required}
                    items={items}
                    multi={multi}
                    control={control}
                    name={name}
                    disabled={disabled || context?.disabled}
                />
            </>
        );
    }
};

export default FESelect;
