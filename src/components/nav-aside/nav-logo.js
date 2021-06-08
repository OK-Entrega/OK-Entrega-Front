import React from 'react';
import "./bg-image.css"

export default function NavLogo({ ...props }) {
    
    let toggleClass = ['mobile-menu'];
    if (props.collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    return (
        <div className="navbar-brand header-logo">
            <a href="/" className="b-brand">
                <div className="img-logo"></div>
            </a>
            <a className={toggleClass.join(' ')} id="mobile-collapse" onClick={props.onToggleNavigation}><span /></a>
        </div>
    );
};
