import React from 'react';

export default function NavBadge ({...props}) {
    let navBadges = false;
    if (props.items.badge) {
        const badgeClass = ['label', 'pcoded-badge', props.items.badge.type];

        navBadges = (
            <span className={badgeClass.join(' ')}>
                {props.items.badge.title}
            </span>
        );
    }
    return navBadges;
};