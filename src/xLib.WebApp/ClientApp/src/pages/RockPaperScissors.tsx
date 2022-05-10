import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React from 'react';
import RockPaperScissorsService from '../services/RockPaperScissorsService';
import { useStyles } from '../styles/RockPaperScissorsPageStyle';

function RockPaperScissors() {
    const { classes } = useStyles();

    function run(selectedType: number) {
        const computerValue = getRandomInt(5) + 1;
        console.log(computerValue);
        const winOrLose = RockPaperScissorsService.calculateWinOrLose(computerValue, selectedType);

        alert(computerValue, selectedType, winOrLose);
    }

    function alert(computer: number, player: number, win?: boolean) {
        let selectetTypeComputer = '';
        let selectetTypePlayer = '';

        switch (computer) {
            case 1:
                selectetTypeComputer = 'Scissors';
                break;
            case 2:
                selectetTypeComputer = 'Rock';
                break;
            case 3:
                selectetTypeComputer = 'Paper';
                break;
            case 4:
                selectetTypeComputer = 'Lizard';
                break;
            case 5:
                selectetTypeComputer = 'Spock';
                break;
        }

        switch (player) {
            case 1:
                selectetTypePlayer = 'Scissors';
                break;
            case 2:
                selectetTypePlayer = 'Rock';
                break;
            case 3:
                selectetTypePlayer = 'Paper';
                break;
            case 4:
                selectetTypePlayer = 'Lizard';
                break;
            case 5:
                selectetTypePlayer = 'Spock';
                break;
        }

        if (win === true) {
            showNotification({
                title: 'Win',
                color: 'green',
                message: (
                    <p>
                        Computer: <b>{selectetTypeComputer}</b> <br />
                        You: <b>{selectetTypePlayer}</b> <br />
                        <b className={classes.win}>Win!</b>
                    </p>
                ),
            });
        } else if (win === false) {
            showNotification({
                title: 'Lost',
                color: 'red',
                message: (
                    <p>
                        Computer: <b>{selectetTypeComputer}</b> <br />
                        You: <b>{selectetTypePlayer} </b> <br />
                        <b className={classes.lose}>Lost!</b>
                    </p>
                ),
            });
        } else {
            showNotification({
                title: 'Draw',
                message: (
                    <p>
                        Computer: <b>{selectetTypeComputer}</b> <br />
                        You: <b>{selectetTypePlayer}</b> <br />
                        <b className={classes.draw}>Draw!</b>
                    </p>
                ),
            });
        }
    }

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    return (
        <>
            <div className={classes.headerText}>Rock Paper Scissors Lizard Spock</div>
            <div className={classes.animationContainer}></div>
            <div className={classes.buttonGroup}>
                <Button onClick={() => run(1)}>Scissors</Button>
                <Button onClick={() => run(2)}>Rock</Button>
                <Button onClick={() => run(3)}>Paper</Button>
                <Button onClick={() => run(4)}>Lizard</Button>
                <Button onClick={() => run(5)}>Spock</Button>
            </div>
        </>
    );
}

export default RockPaperScissors;
