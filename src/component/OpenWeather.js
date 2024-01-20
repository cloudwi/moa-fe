import { Box, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { screen } from '@testing-library/react';

const OpenWeather = ({ location }) => {
    const [temp, setTemp] = useState(null);
    const [description, setDescription] = useState(null);
    const [rain, setRain] = useState(0);
    const [snow, setSnow] = useState(0);

    useEffect(() => {
        image();
    }, [description]);

    useEffect(() => {
        const openApiCall = async () => {
            const now = new Date();

            const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?';
            const API_key = '3799e0bfa8922d8c820dec07024247aa';

            const nx = parseFloat(location.latitude).toFixed(2);
            const ny = parseFloat(location.longitude).toFixed(2);
            const uri = `${baseUrl}lat=${nx}&lon=${ny}&appid=${API_key}&units=metric&lang=kr`;

            const response = await axios
                .get(uri)
                .then((response) => {
                    for (const item of response.data.list) {
                        if (parseInt(item.dt_txt) + 9 * 60 * 60 > parseInt(now.toISOString().slice(0, 16))) {
                            setTemp(item.main.temp);
                            setDescription(item.weather[0].description);

                            if (item.rain) {
                                setRain(item.rain['3h']);
                            }

                            if (item.snow) {
                                setSnow(item.snow['3h']);
                            }

                            break;
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        openApiCall();
    }, [location]);

    const image = () => {
        if (description === '맑음') {
            return 'http://photo.sentv.co.kr/photo/2019/10/16/20191016083501.jpg';
        } else if (description === '온흐림') {
            return 'https://image.imnews.imbc.com/news/2020/society/article/__icsFiles/afieldfile/2020/08/12/jin200812-24.jpg';
        } else
            return 'https://img.freepik.com/premium-photo/question-mark-on-misty-glass-in-rainy-weather_255755-7931.jpg?w=2000';
    };

    return (
        <Box>
            <CardHeader
                title={
                    <img
                        style={{ height: '100%', width: '100%' }}
                        srcSet="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F3cJdm%2FbtsdsShkoXL%2FNxhmKzmFE0XE51LfC0gH11%2Fimg.jpg?w=164&h=164&fit=crop&auto=format&dpr=2 2x"
                    ></img>
                }
            />
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="div"
                    sx={{
                        // 16:9
                        pt: '56.25%',
                    }}
                    image={image()}
                />
                {/* CardContent */}
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        OpenWeather
                    </Typography>
                    <Typography>기온 : {temp}℃</Typography>
                    <Typography>날씨 : {description}</Typography>
                    <Typography>3시간당 강수량 : {rain}</Typography>
                    <Typography>3시간당 강설량 : {snow}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default OpenWeather;
