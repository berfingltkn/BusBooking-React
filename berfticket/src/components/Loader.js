import React from 'react';
import { css } from '@emotion/react';
import { HashLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div
            css={css`
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 9999; 
            `}
        >
            <HashLoader
                color="#2758d2"
                size={80}
            />
        </div>
    );
};

export default Loader;