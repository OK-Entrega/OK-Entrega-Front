import React from 'react';

export default function NavIcon ({...props}) {
    let navIcons = false;
    if (props.items.icon) {
        navIcons = <span className="pcoded-micon"><i className={props.items.icon} /></span>;
    }
    return navIcons;
};