
import React from "react";
import { useAsync } from "react-use";
import { FEInputTypes } from "./Elements/FEInput";

export interface IDetail {
    label?: React.ReactNode;
    children?: React.ReactNode;
    multiLine?: boolean;
    value?: any;
    type?: FEInputTypes;
}

const typeMappingFunctions: any = {
    dob: (value: any) => {
        return value
    },
    date: (value: any) => {
        return value
    },
    checkbox: (value: any) => {
        if (value == true) {
            return "Yes"
        }
        return "No";
    },
};

const Detail: React.FC<IDetail> = ({ children, label, value: rawValue, type }: IDetail) => {
    rawValue = children ?? rawValue;

    const result = useAsync(async () => {
        return rawValue;
    }, [rawValue]);

    const loading = result?.loading;
    let value = result?.value;

    if (loading) {
        value = "";
    }

    value = value ?? children;
    if (typeMappingFunctions?.[type ?? ""] != null) {
        value = typeMappingFunctions?.[type ?? ""](value) ?? value;
    }
    return (
        <div>
            <b>{label}</b>: {value}
        </div>
    );
};

export default Detail;
