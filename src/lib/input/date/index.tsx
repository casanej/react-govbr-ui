import { OnDatesChangeProps, START_DATE, useDatepicker as useDatePicker } from '@datepicker-react/hooks';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, isValid, toDate } from 'date-fns';
import { useOnClickOutside } from 'hooks';
import { Button, InputSelect, InputText } from 'lib';
import { OnChangeValueParameter } from 'models';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { MONTHS } from 'utils';
import { InputLabel } from '../components/general.style';
import { Month } from './components';
import DatePickerContext from './datepicker.context';
import { InputDateActions, InputDateMenu, InputDatePickerMenu, InputDateStyled, InputDateYearSelect } from './index.style';

interface Props {
    hasTime?: boolean;
    label?: string;
    numberOfMonths?: number;
    range?: boolean;
    minBookDate?: Date;
    maxBookDate?: Date;
    onChange?: (dates: [] | [Date, Date?]) => void;
    value?: [] | [Date, Date?];
}

export const InputDate = (props: Props) => {
    const initialDate = useMemo(():Date => toDate(props.value?.[0] || new Date()), []);

    const rangeDate = useCallback((isEdge?: boolean): Date | null => {
        if (props.value && props.value.length) {
            if (!props.range) return props.value[0];
            if (isEdge && props.value[1]) return toDate(props.value[1]);
            if (!isEdge) return toDate(props.value[0]);
        }

        return null;
    }, [props.range]);

    const [dateState, setDateState] = useState<OnDatesChangeProps>({
        startDate: rangeDate(false),
        endDate: rangeDate(true),
        focusedInput: START_DATE,
    });

    const pickerRef = useRef<HTMLDivElement>();
    const refMenuDatePicker = useRef<HTMLDivElement>();
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [year, setYear] = useState(initialDate.getFullYear());
    const [month, setMonth] = useState(initialDate.getMonth());
    const { styles, attributes, forceUpdate } = usePopper(pickerRef.current, refMenuDatePicker.current, {
        modifiers: [{ name: 'arrow' }],
        placement: 'bottom-start'
    });

    useOnClickOutside(pickerRef, () => setDatePickerOpen(false));

    useEffect(() => {
        forceUpdate && forceUpdate();
    }, [datePickerOpen])

    useEffect(() => {
        if (props.onChange) {
            const { startDate, endDate } = dateState;

            if (!startDate && !endDate) props.onChange([]);
            if (!props.range && startDate) props.onChange([startDate]);
            if (props.range && startDate && endDate) props.onChange([startDate, endDate]);
        }
    }, [dateState.startDate, dateState.endDate])

    useEffect(() => {
        if (props.value && props.value.length) {
            const start = toDate(props.value[0]);
            const end = props.value[1] && toDate(props.value[1]);

            if (end) setDateAndGo(end, start, end); else setDateAndGo(start, start, start);
        } else {
            handleOnReset();
        }
    }, [props.value])

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

        return '00/00/0000'
    }, [props.range, props.hasTime]);

    const handleSetDateState = (date: Partial<OnDatesChangeProps>, byPass: boolean = false): void => {
        const dateEqual = date.startDate?.toISOString() === dateState.startDate?.toISOString() && date.endDate?.toISOString() === dateState.endDate?.toISOString();

        if (!dateEqual || byPass) {
            setDateState(oldDates => ({
                ...oldDates,
                ...date
            }));
        }
    }

    const setDateAndGo = (date: Date, startDate: Date, endDate: Date): void => {
        handleSetDateState({ startDate, endDate });
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
        const { startDate, endDate } = data;

        if (!data.focusedInput) {
            handleSetDateState({ ...data, focusedInput: START_DATE });
        } else {
            if (props.range) {
                handleSetDateState({ ...data, endDate: null });
            } else {
                handleSetDateState({ startDate, endDate })
            }
        }
    }

    const handleDateLabel = useMemo((): string => {
        const dateFormat = props.hasTime ? 'dd/MM/yyyy hh:mm:ss' : 'dd/MM/yyyy';

        if (props.range) {
            if (dateState.startDate && dateState.endDate) {
                return `${format(dateState.startDate, dateFormat)} até ${format(dateState.endDate, dateFormat)}`
            }
        } else {
            if (dateState.startDate) {
                return format(dateState.startDate, dateFormat);
            }
        }

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
        handleSetDateState({ startDate: null, endDate: null, focusedInput: START_DATE }, true);
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
                    ref={refMenuDatePicker}
                    id='datePickerMenu'
                    isOpen={datePickerOpen}
                    activeMonths={activeMonths.length}
                    style={{ ...styles.popper}}
                    { ...attributes.popper }
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