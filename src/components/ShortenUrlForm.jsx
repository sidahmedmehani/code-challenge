/* eslint no-unused-vars: 1 */
import React, { useCallback, useState } from 'react';
import useIsMounted from '../useIsMounted';
import { bitlyApi } from '../utils';

const ShortenUrlForm = () => {
    const [value, setValue] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const isMounted = useIsMounted();
    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback(async (e) => {
        e.preventDefault();
        const response = await bitlyApi(value);
        setValue('');
        await navigator.clipboard.writeText(response.data.link);
        if (isMounted) {
            setShortUrl(response.data.link);
        }

    }, [value]);
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="shorten">
                Url:
                <input placeholder="Url to shorten" id="shorten" type="text" value={value} onChange={onChange} />
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
