import { faCircleInfo, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Text } from "@mantine/core";
import React from "react";
import { usePWA } from "../contexts/pwa";

export default function Disclaimer() {
    const { installPWA } = usePWA();
    return (
        <>
            {!localStorage.group && (
                <div className="text-sm text-amber-500 mb-4">
                    <p>
                        Damit der Stundenplan korrekt angezeigt wird, muss im Navigationsmenü
                        zunächst eine Gruppe gewählt werden.
                    </p>
                    <p>
                        Dieses Fenster kann jederzeit über das{" "}
                        <FontAwesomeIcon icon={faCircleInfo} /> im
                        Navigationsmenü geöffnet werden.
                    </p>
                </div>
            )}
            <div className="text-sm mb-4">
                <h3 className="text-base">Datenquellen</h3>
                <p>
                    Alle Daten und Informationen auf dieser Seite sind
                    öffentlich im Internet verfügbar:
                </p>
                <ul className="list-disc pl-6">
                    <li>
                        <a href="https://www.hof-university.de/studierende/info-service/stundenplaene.html" target="_blank" rel="noreferrer">
                            Stundenpläne
                        </a>
                    </li>
                    <li>
                        <a href="https://www.hof-university.de/studieninteressierte/studienangebot/verwaltungsinformatik-dipl/dozenten.html" target="_blank" rel="noreferrer">
                            Dozenten
                        </a>
                    </li>
                </ul>
                <p className="mt-2">
                    Für verlinkte Inhalte (wie etwa Bilder) kann keine
                    Verantwortung auf Richtigkeit übernommen werden.
                </p>
            </div>
            <div className="text-sm">
                <h3 className="text-base">PWA</h3>
                <p>
                    Diese Seite ist eine PWA. Sie kann also wie eine App auf
                    deinem Gerät installiert werden und ist somit auch offline
                    verfügbar.
                </p>
                <Button
                    className="mt-2 mb-8"
                    fullWidth
                    variant="outline"
                    leftIcon={<FontAwesomeIcon icon={faDownload} />}
                    onClick={installPWA}
                >
                    installieren
                </Button>
            </div>

            <div className="pt-2 border-t-2 border-solid border-mantineFg">
                <Text color="dimmed" size="xs">
                    Alle Angaben ohne Gewähr. Sollte sich irgendwo ein Fehler
                    eingeschlichen haben, so darf dieser gerne (z.B. per Mail)
                    gemeldet werden.
                </Text>
            </div>
        </>
    );
}
