import {
    faCircleInfo,
    faDownload,
    faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Select, Text } from "@mantine/core";
import React from "react";
import { useGroup } from "../contexts/gruppe";
import { usePWA } from "../contexts/pwa";

export default function Disclaimer() {
    const { installPWA } = usePWA();
    const { currentGroup, setGroup } = useGroup();

    return (
        <>
            {!localStorage.group && (
                <div className="text-sm text-amber-500 mb-4">
                    <p>
                        Dieses Fenster kann jederzeit über das{" "}
                        <FontAwesomeIcon icon={faCircleInfo} /> im
                        Navigationsmenü geöffnet werden.
                    </p>

                    <Select
                        className="mt-2"
                        icon={<FontAwesomeIcon icon={faUserGroup} />}
                        label={
                            <div className="text-amber-500">
                                <p>Bitte wähle deine Gruppe:</p>
                                <p>
                                    (diese kann später im Navigationsmenü
                                    geändert werden)
                                </p>
                            </div>
                        }
                        placeholder="wähle eine Gruppe"
                        value={currentGroup}
                        onChange={setGroup}
                        data={[
                            { value: "gr1", label: "Gruppe I" },
                            { value: "gr2", label: "Gruppe II" },
                            { value: "gr3", label: "Gruppe III" },
                        ]}
                    />
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
                        <a
                            href="https://www.hof-university.de/studierende/info-service/stundenplaene.html"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Stundenpläne
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.hof-university.de/studieninteressierte/studienangebot/verwaltungsinformatik-dipl/dozenten.html"
                            target="_blank"
                            rel="noreferrer"
                        >
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
                    Diese Seite ist eine PWA. Sie kann also (abhängig vom Browser) wie eine App auf
                    deinem Gerät installiert werden und ist somit auch offline
                    verfügbar.
                </p>
                <p>Eine Übersicht unterstützter Browser findest du <a className="text-mantineAcc underline" href="https://caniuse.com/web-app-manifest" target="_blank" rel="noreferrer">hier</a>.</p>
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
