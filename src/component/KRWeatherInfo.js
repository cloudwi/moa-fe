import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { render } from '@testing-library/react';

function addZero(value) {
    return value < 10 ? `0${value}` : value;
}

const KRWeatherInfo = ({ location }) => {
    const [T1H, setT1H] = useState(null);
    const [SKY, setSKY] = useState(null);
    const [PTY, setPTY] = useState(null);
    const [RN1, setRN1] = useState(null);

    useEffect(() => {
        const openApiCall = async () => {
            const now = new Date();

            const baseUrl = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?';
            const serviceKey =
                '5R9T1SG8PJ%2Bx2S1BbYxXnVQGHUOnIj4ij6DhEEU8LdEIjlN9XZKG7239DKE%2FyJgzfl5f%2B6a72txWs98IaJhOiA%3D%3D';
            const pageNo = '1';
            const numOfRows = '1000';
            const dataType = 'JSON';
            const baseDate = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now
                .getDate()
                .toString()
                .padStart(2, '0')}`;

            const baseTime = `${(now.getHours() - 1).toString().padStart(2, '0')}${now
                .getMinutes()
                .toString()
                .padStart(2, '0')}`;
            const nx = parseInt(location.latitude);
            const ny = parseInt(location.longitude);
            const uri = `${baseUrl}serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&dataType=${dataType}&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

            const response = await axios
                .get(uri)
                .then((response) => {
                    response.data.response.body.items.item.map((item) => {
                        if (
                            item.category === 'T1H' &&
                            item.fcstTime === now.getHours().toString().padStart(2, '0') + '00'
                        ) {
                            setT1H(item.fcstValue);
                        }

                        if (
                            item.category === 'SKY' &&
                            item.fcstTime === now.getHours().toString().padStart(2, '0') + '00'
                        ) {
                            setSKY(item.fcstValue);
                        }

                        if (
                            item.category === 'PTY' &&
                            item.fcstTime === now.getHours().toString().padStart(2, '0') + '00'
                        ) {
                            setPTY(item.fcstValue);
                        }

                        if (
                            item.category === 'RN1' &&
                            item.fcstTime === now.getHours().toString().padStart(2, '0') + '00'
                        ) {
                            setRN1(item.fcstValue);
                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        openApiCall();
    }, [location]);

    const image = () => {
        if (SKY === '1' && PTY === '0') {
            return 'http://photo.sentv.co.kr/photo/2019/10/16/20191016083501.jpg';
        } else if (SKY === '3') {
            return 'https://cdn.joongboo.com/news/photo/202210/363564043_2293846_933.jpeg';
        } else if (SKY == '4') {
            return 'https://image.imnews.imbc.com/news/2020/society/article/__icsFiles/afieldfile/2020/08/12/jin200812-24.jpg';
        } else if (PTY === '1' || PTY === '2' || PTY === '4') {
            return 'https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/5qTh/image/6Ah-3OKTO23vuyxSu4tIgEulQBw.jpg';
        } else if (PTY === '3') {
            return 'https://www.popco.net/zboard/data/photo_gallery/2018/01/13/8915517655a5988119b0f9.JPG';
        } else
            return 'https://img.freepik.com/premium-photo/question-mark-on-misty-glass-in-rainy-weather_255755-7931.jpg?w=2000';
    };

    const weather = () => {
        if (SKY === '1' && PTY === '0') {
            return '맑음';
        } else if (SKY === '3') {
            return '구름 많음';
        } else if (SKY == '4') {
            return '흐림';
        } else if (PTY === '1' || PTY === '2' || PTY === '4') {
            return '비';
        } else if (PTY === '3') {
            return '눈';
        } else return '기다려주세요.';
    };

    return (
        <Box>
            <CardHeader
                title={
                    <img
                        style={{ height: '100%', width: '100%' }}
                        srcSet="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTxmeD%2FbtqCKArBvPm%2F2tzfJfINwg0WWmCzC4jKW0%2Fimg.jpg?w=10&h=10&fit=cover&auto=format&dpr=2 2x"
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
                        기상청
                    </Typography>
                    <Typography>기온 : {T1H}℃</Typography>
                    <Typography>날씨 : {SKY === '1' ? '맑음' : SKY === '3' ? '구름많음' : '흐림'}</Typography>
                    <Typography>시간당 강수량 : {RN1}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default KRWeatherInfo;
