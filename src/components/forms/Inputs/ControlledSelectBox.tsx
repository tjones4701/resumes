import { forceArray } from "@src/utilities/force-array";
import { tryCall } from "@src/utilities/try-call";
import { uniqueArray } from "@src/utilities/unique-array";
import { Select } from "@fluentui/react-components";
import * as React from "react";
import { Controller } from "react-hook-form";

export type IControlledSelectSizes = "mini" | "default" | "compact" | "large";
export type IControlledSelectItem = { label: string; id: string };
export interface IControlledSelect {
    control: any;
    name: string;
    disabled: boolean;
    items: IControlledSelectItem[];
    multi?: boolean;
    value?: any[];
    required?: boolean;
    onInputChange?: (e: any) => void;
    onSelectChange?: (e: any[]) => void;
    isLoading?: boolean;
    noResultsMsg?: string;
}

const ControlledSelectBox: React.FC<IControlledSelect> = function ({
    control,
    name,
    items,
    disabled,
    value,
    multi,
    required,
    onInputChange,
    isLoading,
    onSelectChange,
}: IControlledSelect) {
    let defaultValue = null;
    if (multi) {
        defaultValue = value ?? [];
    }

    return (
        <Controller
            defaultValue={defaultValue}
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                let selectedIds: string[] = forceArray(value ?? []);
                if (!Array.isArray(selectedIds)) {
                    selectedIds = [];
                }

                const itemValues: any[] = (items ?? [])
                    .map((item) => {
                        const itemId = `${item?.id}`;
                        if (selectedIds.includes(itemId)) {
                            return {
                                label: item?.label,
                                id: itemId,
                            };
                        }

                        return null;
                    })
                    .filter((i) => i != null);


                const innerChange = (event: any, eventData: { value: any }) => {
                    let newValues: any[] = [...selectedIds];
                    const selectedId = `${eventData?.value}`;
                    if (event.type == "clear") {
                        if (multi) {
                            newValues = [];
                        } else {
                            newValues = [null];
                        }
                    } else {
                        if (event.type == "remove") {
                            if (multi) {
                                newValues = newValues.filter((item) => {
                                    return item != selectedId;
                                });
                            } else {
                                newValues = [null];
                            }
                        } else {
                            if (!multi) {
                                newValues = [selectedId];
                            } else {
                                newValues.push(selectedId);
                            }
                        }
                    }

                    let newValue = null;
                    if (multi) {
                        newValue = uniqueArray(newValues);
                    } else {
                        newValue = uniqueArray(newValues)?.[0];
                    }
                    tryCall(onSelectChange, newValue);
                    onChange(newValue);
                };


                return (
                    <Select
                        // noResultsMsg={noResultsMsg}
                        onSelect={onInputChange}
                        required={required}
                        multiple={multi}
                        disabled={disabled || isLoading}
                        onChange={innerChange}
                        onBlur={onBlur}
                    >
                        {items.map((item, i) => {
                            const isSelected = itemValues.find((val) => val.id == item.id);
                            return <option selected={isSelected} key={item.id} value={item.id}>{item.label}</option>
                        })}
                    </Select>
                );
            }}
        />
    );
};

export default ControlledSelectBox;
