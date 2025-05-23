"use client";
import NextLink from "next/link";
import { forwardRef } from "react";
import { onStart } from "./router-event";

function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute("target");
    return (
        (target && target !== "_self") ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        (event.nativeEvent && event.nativeEvent.which === 2)
    );
}

const Link = forwardRef(function Link(
    { href, onClick, ...rest },
    ref,
) {
    const useLink = href && href.startsWith("/");
    if (!useLink) return <a href={href} onClick={onClick} {...rest} />;

    return (
        <NextLink
            href={href}
            onClick={(event) => {
                if (!isModifiedEvent(event)) {
                    const { pathname, search, hash } = window.location;
                    if (href !== pathname + search + hash) onStart();
                }
                if (onClick) onClick(event);
            }}
            {...rest}
            ref={ref}
        />
    );
});

export default Link;
