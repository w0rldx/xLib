import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    headerText: {
        fontWeight: 600,
        fontSize: 30,
        textDecoration: 'underline',
    },

    buttonGroup: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        columnGap: 20,
    },

    button: {},

    animationContainer: {
        height: 100,
    },

    win: {
        color: 'green',
    },

    lose: {
        color: 'red',
    },

    draw: {
        color: theme.primaryColor,
    },
}));

export { useStyles };
