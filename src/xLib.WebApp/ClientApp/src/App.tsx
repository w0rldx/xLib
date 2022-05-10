import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import Finances from './pages/Finances';
import Home from './pages/Home';
import RockPaperScissors from './pages/RockPaperScissors';
import './scss/Index.scss';

const queryClient = new QueryClient();

function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <ColorSchemeProvider
                    colorScheme={colorScheme}
                    toggleColorScheme={toggleColorScheme}
                >
                    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                        <NotificationsProvider>
                            <SiteLayout>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/finances" element={<Finances />} />
                                    <Route
                                        path="/rockpaperscissors"
                                        element={<RockPaperScissors />}
                                    />
                                </Routes>
                                <ReactQueryDevtools initialIsOpen={false} />
                            </SiteLayout>
                        </NotificationsProvider>
                    </MantineProvider>
                </ColorSchemeProvider>
            </QueryClientProvider>
        </div>
    );
}

export default App;
