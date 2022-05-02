import { FocusedInput, OnDatesChangeProps, START_DATE, useDatepicker as useDatePicker } from '@datepicker-react/hooks';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, isValid, toDate } from 'date-fns';
import { useOnClickOutside } from 'hooks';
import { Button, InputSelect, InputText } from 'lib';
import { InputDateInitialDates, OnChangeValueParameter } from 'models';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { MONTHS } from 'utils';
import { InputLabel } from '../components/general.style';
import { Month } from './components';
import DatePickerContext from './datepicker.context';
import { InputDateActions, InputDateMenu, InputDatePickerMenu, InputDateStyled, InputDateYearSelect } from './index.style';

interface Props {
    initialDate?: InputDateInitialDates;
    hasTime?: boolean;
    label?: string;
    numberOfMonths?: number;
    range?: boolean;
    minBookDate?: Date;
    maxBookDate?: Date;
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

    const [dateState, setDateState] = useState<{ startDate: Date | null; endDate: Date | null; focusedInput: FocusedInput }>({
        startDate: rangeDate(false),
        endDate: rangeDate(true),
        focusedInput: START_DATE,
    });

    const { firstDayOfWeek, activeMonths, isDateSelected, isDateHovered, isFirstOrLastSelectedDate, isDateBlocked, isDateFocused, focusedDate, onDateHover, onDateSelect, onDateFocus, goToDate } = useDatePicker({
        startDate: dateState.startDate,
        endDate: dateState.endDate,
        focusedInput: dateState.focusedInput,
        onDatesChange: handleDateChange,
        initialVisibleMonth: initialDate,
        firstDayOfWeek: 0,
        minBookingDate: props.minBookDate,
        maxBookingDate: props.maxBookDate,
        numberOfMonths: props.numberOfMonths || 1
    });

    const handleDateMask = useMemo((): string => {
        if (props.range) return '00/00/0000 até 00/00/0000';
        if (props.hasTime) return '00/00/0000 00:00';

        return '00/00/00'
    }, [props.range, props.hasTime]);

    const setDateAndGo = (date: Date, startDate: Date, endDate: Date): void => {
        setDateState(oldDates => ({
            ...oldDates,
            startDate,
            endDate,
        }))
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        goToDate(props.range ? endDate : startDate);
    }

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
            setDateState({ ...data, focusedInput: START_DATE });
        } else {
            if (props.range) {
                setDateState({ ...data, endDate: null });
            } else {
                setDateState(oldData => ({
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
            if (dateState.startDate && dateState.endDate) {
                if (props.onChange) props.onChange([dateState.startDate, dateState.endDate]);
                return `${format(dateState.startDate, dateFormat)} até ${format(dateState.endDate, dateFormat)}`
            }
        } else {
            if (dateState.startDate) {
                if (props.onChange) props.onChange([dateState.startDate]);
                return format(dateState.startDate, dateFormat);
            }
        }

        if (props.onChange) props.onChange([]);

        return '';
    }, [props.hasTime, props.range, dateState.startDate, dateState.endDate]);

    const handleChangeDate = (value: OnChangeValueParameter) => {
        const { masked } = value;

        if (masked) {
            if (props.range) {
                const splittedDates = masked.split(' até ');
                const formattedDates = splittedDates.map(date => date.split('/').map(item => parseInt(item)));
                const validDates = formattedDates.map(date => new Date(date[2], date[1] - 1, date[0]));

                if (isValid(validDates[0]) && isValid(validDates[1]) && formattedDates[1][2].toString().length >= 4) setDateAndGo(validDates[1], validDates[0], validDates[1]);
            } else {
                const formattedDate = masked.split('/').map(item => parseInt(item));
                const validDate = new Date(formattedDate[2], formattedDate[1] - 1, formattedDate[0]);

                if (isValid(validDate) && formattedDate[2].toString().length >= 4) setDateAndGo(validDate, validDate, validDate);
            }
        }
    }

    const handleOnReset = () => {
        setDateState({
            startDate: null,
            endDate: null,
            focusedInput: START_DATE,
        });
    }

    return (
        <DatePickerContext.Provider
            value={{ focusedDate, isDateFocused, isDateSelected, isDateHovered, isDateBlocked, isFirstOrLastSelectedDate, onDateSelect, onDateFocus, onDateHover }}
        >
            <InputDateStyled ref={pickerRef}>
                {
                    props.label && <InputLabel direction='column'>{props.label}</InputLabel>
                }
                <InputText
                    value={handleDateLabel}
                    action={{
                        icon: 'calendar-alt',
                        onClick: () => setDatePickerOpen(oldValue => !oldValue)
                    }}
                    maskObj={{
                        mask: handleDateMask,
                    }}
                    hasReset={!!dateState.startDate}
                    onReset={handleOnReset}
                    readOnly
                    placeholder={handlePlaceholder}
                    onChange={handleChangeDate}
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