import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Core from './Core';
import './scss/Index.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Core />
        </BrowserRouter>
    </React.StrictMode>
);
