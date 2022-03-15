import { InputSelect } from 'lib';
import { SelectItemProps } from 'models';
import React, { ReactElement } from 'react';

interface Props {
    selectedItem: SelectItemProps;
    onChange: (item: SelectItemProps) => void;
}

export const PaginationSizeSelect = (props: Props): ReactElement => {

    const handleChange = (item: SelectItemProps[]) => {
        const itemSelected: SelectItemProps = item[0] || props.selectedItem;

        props.onChange(itemSelected);
    }

    return <InputSelect
        inputVariant='tertiary'
        items={[
            { label: '10', value: '10' },
            { label: '20', value: '20' },
            { label: '30', value: '30' },
            { label: '50', value: '50' },
            { label: '100', value: '100' },
        ]}
        selectedItems={[props.selectedItem]}
        onChange={handleChange}
    />;
};
