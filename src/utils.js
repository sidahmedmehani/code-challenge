import axios from 'axios';

export const bitlyApi = async value => axios.post(
    'https://api-ssl.bitly.com/v4/shorten',
    {
        long_url: value,
        domain: 'bit.ly',
    },
    {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_BITLY_AUTORIZATION_TOKEN}`,
        },
    },
);
