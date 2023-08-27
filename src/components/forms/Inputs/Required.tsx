
import { useFormStyles } from "@src/components/forms/form-styles";
import React from "react";

interface IRequired {
    className?: string;
}

const Required: React.FC<IRequired> = ({ className }: IRequired) => {
    const { required } = useFormStyles();
    className = `${className ?? ""} ${required}`;
    return <span className={className}>*</span>;
};

export default Required;
