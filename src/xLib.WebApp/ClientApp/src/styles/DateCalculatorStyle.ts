import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
    },

    gap: {
        margin: theme.spacing.md,
    },

    rowFlex: {
        display: 'flex',
        flexDirection: 'row',
    },

    button: {
        marginRight: '10px',
    },
}));

export { useStyles };
