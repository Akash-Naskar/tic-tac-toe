import React from 'react';

const Cross = () => {
    return (
        <svg width="100" height="100" viewBox="0 0 100 100">
            <line x1="10" y1="10" x2="90" y2="90" stroke="white" strokeWidth="10" />
            <line x1="90" y1="10" x2="10" y2="90" stroke="white" strokeWidth="10" />
        </svg>
    );
};

export default Cross;