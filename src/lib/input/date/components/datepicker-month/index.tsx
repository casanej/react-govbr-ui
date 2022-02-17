import React from 'react';
import { useMonth } from '@datepicker-react/hooks';
import { Day } from '..';
import { WEEK_LABELS } from 'utils';

export function Month({ year, month, firstDayOfWeek }: any) {
    const { days, weekdayLabels } = useMonth({
        year,
        month,
        firstDayOfWeek
    });

    return (
        <div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    fontSize: '10px'
                }}
            >
                {weekdayLabels.map(dayLabel =>
                    <div style={{ textAlign: 'center' }} key={dayLabel}>
                        {WEEK_LABELS[dayLabel as keyof typeof WEEK_LABELS]}
                    </div>
                )}
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    justifyContent: 'center'
                }}
            >
                {days.map((day, index) => {
                    if (typeof day === 'object') {
                        return (
                            <Day
                                date={day.date}
                                key={day.date.toString()}
                                dayLabel={day.dayLabel}
                            />
                        );
                    }

                    return <div key={index} />;
                })}
            </div>
        </div>
    );
}