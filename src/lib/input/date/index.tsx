import React, { useCallback, useMemo, useState } from 'react';
import { useDatepicker as useDatePicker, START_DATE, FocusedInput, OnDatesChangeProps } from '@datepicker-react/hooks';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toDate, add } from 'date-fns'
import { Button, InputSelect, InputText } from 'lib';
import DatePickerContext from './datepicker.context';
import { Month } from './components';
import { InputDateActions, InputDateMenu, InputDateStyled, InputDateYearSelect } from './index.style';
import { InputDateInitialDates } from 'models';
import { MONTHS } from 'utils';

interface Props {
    initialDate?: InputDateInitialDates;
    numberOfMonths?: number;
    range?: boolean;
}

export const InputDate = (props: Props) => {
    const initialDate = useMemo(():Date => toDate(props.initialDate?.start || new Date()), [props.initialDate]);
    const rangeDate = useCallback((isEdge?: boolean): Date | null => {
        if (!props.range) return initialDate;

        if (props.initialDate) {
            if (isEdge && props.initialDate.end) return toDate(props.initialDate?.end);
            if (!isEdge) return toDate(props.initialDate.start);
        }

        return null;
    }, [props.range]);

    const [state, setState] = useState<{ startDate: Date | null; endDate: Date | null; focusedInput: FocusedInput }>({
        startDate: rangeDate(false),
        endDate: rangeDate(true),
        focusedInput: START_DATE,
    });
    const [year, setYear] = useState(initialDate.getFullYear());
    const [month, setMonth] = useState(initialDate.getMonth());

    const {
        firstDayOfWeek,
        activeMonths,
        isDateSelected,
        isDateHovered,
        isFirstOrLastSelectedDate,
        isDateBlocked,
        isDateFocused,
        focusedDate,
        onDateHover,
        onDateSelect,
        onDateFocus,
        goToPreviousMonths,
        goToNextMonths,
        goToDate
    } = useDatePicker({
        startDate: state.startDate,
        endDate: state.endDate,
        focusedInput: state.focusedInput,
        onDatesChange: handleDateChange,
        initialVisibleMonth: initialDate,
        numberOfMonths: props.numberOfMonths || 1
    });

    function handleDateChange(data: OnDatesChangeProps) {
        if (!data.focusedInput) {
            setState({ ...data, focusedInput: START_DATE });
        } else {
            if (props.range) {
                setState(data);
            } else {
                setState(oldData => ({
                    ...oldData,
                    startDate: data.startDate,
                    endDate: data.startDate,
                }))
            }
        }
    }

    return (
        <DatePickerContext.Provider
            value={{
                focusedDate,
                isDateFocused,
                isDateSelected,
                isDateHovered,
                isDateBlocked,
                isFirstOrLastSelectedDate,
                onDateSelect,
                onDateFocus,
                onDateHover
            }}
        >
            <div>
                <strong>Focused input: </strong>
                {state.focusedInput}
            </div>
            <div>
                <strong>Start date: </strong>
                {state.startDate && state.startDate.toLocaleString()}
            </div>
            <div>
                <strong>End date: </strong>
                {state.endDate && state.endDate.toLocaleString()}
            </div>

            <Button onClick={goToPreviousMonths}>Previous</Button>
            <Button onClick={goToNextMonths}>Next</Button>
            <InputDateStyled
                activeMonths={activeMonths.length}
            >
                <InputDateActions>
                    <Button variant='tertiary' circle onClick={goToPreviousMonths}><FontAwesomeIcon icon={faChevronLeft} /></Button>

                    <InputSelect
                        items={MONTHS}
                        selectedItems={[MONTHS[month]]}
                        onChange={(e) => setMonth(parseInt(e[0].value))}
                    />

                    <InputDateYearSelect>
                        <InputText
                            value={year.toString()}
                            type='number'
                            maxLength={4}
                            onChange={(e) => setYear(parseInt(e.normal))}
                        />
                    </InputDateYearSelect>

                    <Button variant='tertiary' circle onClick={goToNextMonths}><FontAwesomeIcon icon={faChevronRight} /></Button>
                </InputDateActions>
                <InputDateMenu
                    activeMonths={activeMonths.length}
                >
                    {activeMonths.map(month =>
                        <Month
                            key={`${month.year}-${month.month}`}
                            year={month.year}
                            month={month.month}
                            firstDayOfWeek={firstDayOfWeek}
                        />
                    )}
                </InputDateMenu>
            </InputDateStyled>
        </DatePickerContext.Provider>
    );
}