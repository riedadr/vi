import {
    faAngleDown,
    faAngleUp,
    faCheck,
    faCircleInfo,
    faCopy,
    faEnvelope,
    faExclamation,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Collapse, Text } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import React, { useState } from "react";
import { listeDozenten } from "./listeDozenten";

export default function Dozenten() {
    return (
        <>
            <ul className="grid gap-4">
                {listeDozenten.map((item, index) => {
                    return <Dozent key={index} item={item} />;
                })}
            </ul>
        </>
    );
}

function Dozent(props) {
    const [opened, setOpen] = useState(false);
    const notifications = useNotifications();

    const showSuccess = (content) =>
        notifications.showNotification({
            title: "Kopieren erfolgreich",
            message:
                content + " wurde erfolgreich in die Zwischenablage kopiert",
            color: "teal",
            icon: <FontAwesomeIcon icon={faCheck} />,
        });

    const showError = (err, content) =>
        notifications.showNotification({
            title: "Kopieren fehlgeschlage!",
            message: content + " konnte nicht kopiert werden: \n" + err,
            color: "red",
            icon: <FontAwesomeIcon icon={faExclamation} />,
        });

    return (
        <li className="dozent mr-2">
            <Button
                className="btn-space-between bg-mantineFg rounded text-sm"
                fullWidth
                color="gray"
                rightIcon={
                    <FontAwesomeIcon icon={opened ? faAngleUp : faAngleDown} />
                }
                onClick={() => setOpen((o) => !o)}
            >
                <div className="w-full flex items-center">
                    <img
                        className="profile-pic my-2"
                        src={props.item.bild}
                        alt=""
                    />
                    <div className="ml-3 text-left">
                        <p>
                            {props.item.titel} {props.item.vorname}{" "}
                            {props.item.nachname}
                        </p>
                        <Text color="dimmed" size="xs" weight={500}>{props.item.fach}</Text>
                    </div>
                </div>
            </Button>

            <Collapse in={opened} className="mt-2 bg-mantineFg rounded">
                <Button
                    className="btn-text-left"
                    variant="subtle"
                    color="yellow"
                    component="a"
                    href={props.item.url}
                    target="_blank"
                    fullWidth
                    leftIcon={<FontAwesomeIcon icon={faCircleInfo} />}
                >
                    HAW-Profil
                </Button>
                <div className="flex justify-between dozent-info">
                    <Button
                        className="btn-text-left"
                        variant="subtle"
                        fullWidth
                        component="a"
                        href={"mailto:" + props.item.email}
                        target="_blank"
                        leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
                    >
                        <p className="text-ellipsis">
                            {props.item.email.substring(
                                0,
                                props.item.email.length - 18
                            )}
                        </p>
                    </Button>

                    <Button
                        variant="subtle"
                        onClick={(e) => {
                            e.preventDefault();
                            navigator.clipboard
                                .writeText(props.item.email)
                                .then(
                                    function () {
                                        showSuccess(props.item.email);
                                    },
                                    function (err) {
                                        showError(err, props.item.email);
                                    }
                                );
                        }}
                    >
                        <FontAwesomeIcon icon={faCopy} />
                    </Button>
                </div>
                <div className="flex justify-between dozent-info">
                    <Button
                        className="btn-text-left"
                        variant="subtle"
                        fullWidth
                        color="green"
                        component="a"
                        href={"tel:" + props.item.tel}
                        target="_blank"
                        leftIcon={<FontAwesomeIcon icon={faPhone} />}
                    >
                        <p className="text-ellipsis">{props.item.tel}</p>
                    </Button>

                    <Button
                        variant="subtle"
                        color="green"
                        onClick={(e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(props.item.tel).then(
                                function () {
                                    showSuccess(props.item.tel);
                                },
                                function (err) {
                                    showError(err, props.item.tel);
                                }
                            );
                        }}
                    >
                        <FontAwesomeIcon icon={faCopy} />
                    </Button>
                </div>
            </Collapse>
        </li>
    );
}
