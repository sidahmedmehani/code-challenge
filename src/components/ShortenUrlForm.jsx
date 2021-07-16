/* eslint no-unused-vars: 1 */
import React, { useCallback, useEffect, useState } from 'react';
import { bitlyApi } from '../utils';

const ShortenUrlForm = () => {
    const [value, setValue] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [isSubmited, setIsSubmited] = useState(false);
    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setIsSubmited(true);
    }, []);

    useEffect(async () => {
        if (isSubmited) {
            const response = await bitlyApi(value);
            setValue('');
            await navigator.clipboard.writeText(response.data.link);
            setShortUrl(response.data.link);
            setIsSubmited(false);
        }
    }, [isSubmited]);

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="shorten">
                Url:
                <input
                    placeholder="Url to shorten"
                    id="shorten"
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </label>
            <input type="submit" value="Shorten and copy URL" />
            {/* TODO: show below only when the url has been shortened and copied */}
            <div>
                {/* Show shortened url --- copied! */}
                {shortUrl && shortUrl}
            </div>
        </form>
    );
};

export default ShortenUrlForm;
