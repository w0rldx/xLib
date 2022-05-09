import React from 'react';
import { useStyles } from '../styles/FinancePageStyle';

function Finances() {
    const { classes } = useStyles();
    return (
        <>
            <div className={classes.headerText}>Finanzdienstleister Reibach&Shöhne</div>
            <hr />
            <ul>
                <li>Aktien</li>
                <li>Immobilien</li>
                <li>Sparkonto</li>
            </ul>

            <p>
                Und jetzt kommen unsere wirklich prakischen tipps <br />
                Sie wollen doch ihr Geld vermehren! <a href="aktien">Aktien</a>
                <br />
                Ihr Geld soll doch sicher sein! <a href="sparkonto">Sparkonto</a>
                <br />
                BetonGold! <a href="immobilien">Immobilien</a>
            </p>
        </>
    );
}

export default Finances;
