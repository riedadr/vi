import { faExclamation, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNotifications } from "@mantine/notifications";
import React, { createContext, useContext, useState, useEffect } from "react";

const PWAContext = createContext();

export function usePWA() {
    return useContext(PWAContext);
}

export function PWAProvider({ children }) {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);
    const notifications = useNotifications();


    useEffect(() => {
        try {
            const handler = (e) => {
                e.preventDefault();
                setSupportsPWA(true);
                setPromptInstall(e);
            };
            window.addEventListener("beforeinstallprompt", handler);

            return () => window.removeEventListener("transitionend", handler);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const installPWA = (evt) => {
        if (supportsPWA) {
            evt.preventDefault();
            if (!promptInstall) {
                return;
            }
            promptInstall.prompt();
        } else {
            notifications.showNotification({
                title: "Installation nicht möglich!",
                message: <><p>Manche Browser (Firefox) untersützten PWAs nicht. <a href="https://caniuse.com/web-app-manifest" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faCircleQuestion} /></a></p><p>Möglicherweise ist die PWA auch bereits installiert</p></>,
                color: "red",
                icon: <FontAwesomeIcon icon={faExclamation} />,
            });
        }
    };

    const value = {
        installPWA,
    };

    return (
        <div>
            <PWAContext.Provider value={value}>{children}</PWAContext.Provider>
        </div>
    );
}
