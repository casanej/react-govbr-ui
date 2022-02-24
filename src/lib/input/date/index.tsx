import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDatepicker as useDatePicker, START_DATE, FocusedInput, OnDatesChangeProps } from '@datepicker-react/hooks';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, toDate } from 'date-fns'
import { Button, InputSelect, InputText } from 'lib';
import DatePickerContext from './datepicker.context';
import { Month } from './components';
import { InputDateActions, InputDateMenu, InputDatePickerMenu, InputDateStyled, InputDateYearSelect, InputLabel } from './index.style';
import { InputDateInitialDates } from 'models';
import { MONTHS } from 'utils';
import { useOnClickOutside } from 'hooks';

interface Props {
    initialDate?: InputDateInitialDates;
    hasTime?: boolean;
    label?: string;
    numberOfMonths?: number;
    range?: boolean;
    onChange?: (dates: Date[]) => void;
}

export const InputDate = (props: Props) => {
    const pickerRef = useRef<HTMLDivElement>()
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const initialDate = useMemo(():Date => toDate(props.initialDate?.start || new Date()), [props.initialDate]);
    const [year, setYear] = useState(initialDate.getFullYear());
    const [month, setMonth] = useState(initialDate.getMonth());
    useOnClickOutside(pickerRef, () => setDatePickerOpen(false));

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

    const { firstDayOfWeek, activeMonths, isDateSelected, isDateHovered, isFirstOrLastSelectedDate, isDateBlocked, isDateFocused, focusedDate, onDateHover, onDateSelect, onDateFocus, goToDate } = useDatePicker({
        startDate: state.startDate,
        endDate: state.endDate,
        focusedInput: state.focusedInput,
        onDatesChange: handleDateChange,
        initialVisibleMonth: initialDate,
        firstDayOfWeek: 0,
        numberOfMonths: props.numberOfMonths || 1
    });

    const handleChangeMonth = useCallback((isNext: boolean): void => {
        const currentMonth = month;
        const currentYear = year;
        let changedMonth = isNext ? currentMonth + 1 : currentMonth - 1;
        let changedYear = year;

        if (changedMonth < 0) {
            changedYear = currentYear - 1;
            changedMonth = 11;
        }

        if (changedMonth > 11) {
            changedYear = currentYear + 1;
            changedMonth = 0;
        }

        setMonth(changedMonth);
        setYear(changedYear);
        goToDate(new Date(changedYear, changedMonth));
    }, [month, year]);

    const handlePlaceholder = useMemo((): string => {
        if (props.range) return 'dd/mm/aaaa até dd/mm/aaaa';

        return 'dd/mm/aaaa';
    }, []);

    function handleDateChange(data: OnDatesChangeProps) {
        if (!data.focusedInput) {
            setState({ ...data, focusedInput: START_DATE });
        } else {
            if (props.range) {
                setState({ ...data, endDate: null });
            } else {
                setState(oldData => ({
                    ...oldData,
                    startDate: data.startDate,
                    endDate: data.startDate,
                }))
            }
        }
    }

    const handleDateLabel = useMemo((): string => {
        const dateFormat = props.hasTime ? 'dd/MM/yyyy hh:mm:ss' : 'dd/MM/yyyy';

        if (props.range) {
            if (state.startDate && state.endDate) {
                if (props.onChange) props.onChange([state.startDate, state.endDate]);
                return `${format(state.startDate, dateFormat)} até ${format(state.endDate, dateFormat)}`
            }
        } else {
            if (state.startDate) {
                if (props.onChange) props.onChange([state.startDate]);
                return format(state.startDate, dateFormat);
            }
        }

        return '';
    }, [props.hasTime, props.range, state.startDate, state.endDate]);

    return (
        <DatePickerContext.Provider
            value={{ focusedDate, isDateFocused, isDateSelected, isDateHovered, isDateBlocked, isFirstOrLastSelectedDate, onDateSelect, onDateFocus, onDateHover }}
        >
            <InputDateStyled ref={pickerRef}>
                {
                    props.label && <InputLabel>{props.label}</InputLabel>
                }
                <InputText
                    value={handleDateLabel}
                    action={{
                        icon: 'calendar-alt',
                        onClick: () => setDatePickerOpen(oldValue => !oldValue)
                    }}
                    hasReset
                    placeholder={handlePlaceholder}
                    onFocus={() => setDatePickerOpen(true)}
                />
                <InputDatePickerMenu
                    id='datePickerMenu'
                    isOpen={datePickerOpen}
                    activeMonths={activeMonths.length}
                >
                    <InputDateActions>
                        <Button variant='tertiary' circle onClick={() => handleChangeMonth(false)}><FontAwesomeIcon icon={faChevronLeft} /></Button>

                        <InputSelect
                            items={MONTHS}
                            selectedItems={[MONTHS[month]]}
                            onChange={(e) => {
                                const newMonth = parseInt(e[0].value);
                                goToDate(new Date(year, newMonth));
                                setMonth(newMonth)
                            }}
                        />

                        <InputDateYearSelect>
                            <InputText
                                value={year.toString()}
                                type='number'
                                maxLength={4}
                                onChange={(e) => {
                                    if (e.normal.length === 4) {
                                        const newYear = parseInt(e.normal);
                                        setYear(parseInt(e.normal))
                                        goToDate(new Date(newYear, month));
                                    }
                                }}
                            />
                        </InputDateYearSelect>

                        <Button variant='tertiary' circle onClick={() => handleChangeMonth(true)}><FontAwesomeIcon icon={faChevronRight} /></Button>
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
                </InputDatePickerMenu>
            </InputDateStyled>
        </DatePickerContext.Provider>
    );
}