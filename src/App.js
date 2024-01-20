import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LightModeIcon from '@mui/icons-material/LightMode';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useGeoLocation } from './hooks/useGeoLocation';
import KRWeatherInfo from './component/KRWeatherInfo';
import OpenWeather from './component/OpenWeather';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="cloudwi@naver.com">
                moa website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
    maximumAge: 1000 * 600, // 24 hour
};

const cards = [1, 2, 3];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function App() {
    const { location, error } = useGeoLocation(geolocationOptions);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar position="relative" color="info">
                <Toolbar>
                    <LightModeIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        moa
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 4,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                            Moa
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            현재 위치의 날씨정보를 모아보세요.
                        </Typography>
                        <Stack sx={{ pt: 4 }} direction="column" spacing={2} justifyContent="center">
                            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                현재 시간 : {new Date().toLocaleString()}
                            </Typography>
                            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                위도 : {parseInt(location.latitude)}, 경도 : {parseInt(location.longitude)}
                            </Typography>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4}>
                            <KRWeatherInfo location={location}></KRWeatherInfo>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <OpenWeather location={location}></OpenWeather>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <KRWeatherInfo location={location}></KRWeatherInfo>
                        </Grid>
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    광고문의
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                    010-5432-7510
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}

export default App;
