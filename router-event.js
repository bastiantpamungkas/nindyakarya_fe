import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import LoaderMain from "./components/LoaderMain";

export function onStart() {
    LoaderMain.start();
}

export function onComplete() {
    LoaderMain.done();
}

function useOnComplete() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    useEffect(() => onComplete(), [pathname, searchParams]);
}

function __RouterEvents() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useOnComplete();

    return null;
}

export function RouterEvents() {
    return (
        <Suspense>
            <__RouterEvents />
        </Suspense>
    );
}
