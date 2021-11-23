import React from 'react'
import {
    Link,
    useMatch,
    useResolvedPath
} from "react-router-dom";

export default function CustomLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Link
            style={{ boxShadow: match ? '0 8px #313235' : '0 8px floralwhite' }}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
}


