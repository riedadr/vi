import { faExclamation } from "@fortawesome/free-solid-svg-icons";
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
                console.log("we are being triggered :D");
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
            console.log("PWA not supported!");
            notifications.showNotification({
                title: "Installation nicht möglich!",
                message: "Manche Browser (Firefox) untersützten PWAs nicht. Möglicherweise ist die PWA auch bereits installiert",
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
