import React from 'react';

export const LoaderFill = () => {
    return (
        <div className="loader-bg" style={{zIndex: 9999999}}>
            <div className="loader-track">
                <div className="loader-fill"/>
            </div>
        </div>
    );
};
