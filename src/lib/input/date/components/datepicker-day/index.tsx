import React, { useRef, useContext, useMemo } from 'react';
import { useDay } from '@datepicker-react/hooks';
import datepickerContext from '../../datepicker.context';
import { DayButton, DayTypeSelect } from './index.style';

function getColor( isSelected: any, isSelectedStartOrEnd: any, isWithinHoverRange: any, isDisabled: any ) {
    return ({
        selectedFirstOrLastColor,
        normalColor,
        selectedColor,
        rangeHoverColor,
        disabledColor
    }: any) => {
        if (isSelectedStartOrEnd) {
            return selectedFirstOrLastColor;
        } else if (isSelected) {
            return selectedColor;
        } else if (isWithinHoverRange) {
            return rangeHoverColor;
        } else if (isDisabled) {
            return disabledColor;
        } else {
            return normalColor;
        }
    };
}

export function Day({ dayLabel, date }: any) {
    const dayRef = useRef(null);
    const {
        focusedDate,
        isDateFocused,
        isDateSelected,
        isDateHovered,
        isDateBlocked,
        isFirstOrLastSelectedDate,
        onDateSelect,
        onDateFocus,
        onDateHover
    } = useContext(datepickerContext);
    const {
        isSelected,
        isSelectedStartOrEnd,
        isWithinHoverRange,
        disabledDate,
        onClick,
        onKeyDown,
        onMouseEnter,
        tabIndex
    } = useDay({
        date,
        focusedDate,
        isDateFocused,
        isDateSelected,
        isDateHovered,
        isDateBlocked,
        isFirstOrLastSelectedDate,
        onDateFocus,
        onDateSelect,
        onDateHover,
        dayRef
    });

    if (!dayLabel) {
        return <div />;
    }

    const getColorFn = getColor(
        isSelected,
        isSelectedStartOrEnd,
        isWithinHoverRange,
        disabledDate
    );

    const handleTypeDaySelect = useMemo((): DayTypeSelect => {
        if (disabledDate) return 'disabled'
        if (isSelectedStartOrEnd) return 'selected_start_or_end';
        if (isSelected) return 'selected_between';
        if (isWithinHoverRange) return 'selecting_hover';

        return 'none';
    }, [isSelected, isSelectedStartOrEnd, isWithinHoverRange, disabledDate])

    return (
        <DayButton
            onClick={onClick}
            onKeyDown={onKeyDown}
            onMouseEnter={onMouseEnter}
            tabIndex={tabIndex}
            type='button'
            ref={dayRef}
            typeSelect={handleTypeDaySelect}
        >
            {dayLabel}
        </DayButton>
    );
}