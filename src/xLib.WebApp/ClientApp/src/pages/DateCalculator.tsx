import { Button, NumberInput, Text } from '@mantine/core';
import React, { useState } from 'react';
import { useStyles } from '../styles/DateCalculatorStyle';

function DateCalculator() {
    const { classes } = useStyles();
    const [startDate, setStartDate] = useState<number | undefined>(0);
    const [endDate, setEndDate] = useState<number | undefined>(0);
    const [outputElement, setOutputElement] = useState<string[]>([]);

    const createItem = (date: number, year: number) => {
        if (date - 31 > 0) {
            date = date - 31;
            return `${date}. April ${year}`;
        } else {
            return `${date}. März ${year}`;
        }
    };

    const berechne = () => {
        setOutputElement([]);
        const dateToCalculate: number[] = [];
        if (startDate && endDate) {
            for (let i = startDate; i <= endDate; i++) {
                dateToCalculate.push(i);
            }

            for (let i = 0; i < dateToCalculate.length; i++) {
                const date = returnDate(dateToCalculate[i]);
                console.log(dateToCalculate[i]);
                console.log(date);

                setOutputElement((output) => {
                    return [...output, createItem(date, dateToCalculate[i])];
                });
            }
        }
    };

    function returnDate(year: number) {
        const a = year % 19;
        const b = year % 4;
        const c = year % 7;
        const k = Math.floor(year / 100);
        const p = Math.floor(k / 3);
        const q = Math.floor(k / 4);

        const m = (15 + k - p - q) % 30;
        const n = (4 + k - q) % 7;

        const d = (19 * a + m) % 30;
        const e = (2 * b + 4 * c + 6 * d + n) % 7;

        const day = 22 + d + e;

        if (d === 29 && e === 6) {
            return 50;
        }

        if (d === 28 && e === 6) {
            const t = (11 * m + 11) % 30;

            if (t < 19) {
                return 49;
            }
        }

        return day;
    }

    function clearItems() {
        setOutputElement([]);
    }

    return (
        <>
            <div className={classes.container}>
                <Text className={classes.gap}>Datum Beginn:</Text>
                <NumberInput
                    id="startNumber"
                    className={classes.gap}
                    placeholder="Start"
                    required
                    onChange={(val) => setStartDate(val)}
                />
                <Text className={classes.gap}>Datum Ende:</Text>
                <NumberInput
                    id="endNumber"
                    className={classes.gap}
                    placeholder="End"
                    required
                    onChange={(val) => setEndDate(val)}
                />
            </div>
            <div className={classes.container}>
                <Button onClick={() => berechne()} className={classes.button}>
                    Rechne
                </Button>
                <Button onClick={() => clearItems()} className={classes.button}>
                    Löschen
                </Button>
            </div>
            <div className={classes.rowFlex}>
                <ul>
                    {outputElement.map((element) => {
                        return <li key={element}>{element}</li>;
                    })}
                </ul>
            </div>
        </>
    );
}

export default DateCalculator;
