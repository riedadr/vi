import {
    faAngleDown,
    faAngleUp,
    faCheck,
    faCircleInfo,
    faCopy,
    faEnvelope,
    faExclamation,
    faMagnifyingGlass,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Collapse, Text } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import React, { useState } from "react";
import { listeDozenten } from "./listeDozenten";

export default function Dozenten() {
    const [name, setName] = useState("");

    // the search result
    const [foundUsers, setFoundUsers] = useState(listeDozenten);

    const filter = (e) => {
        const keyword = e.target.value;

        if (keyword !== "") {
            const results = listeDozenten.filter((user) => {
                return (
                    user.fach +
                    user.titel +
                    user.vorname +
                    user.nachname +
                    user.email +
                    user.tel
                )
                    .toLowerCase()
                    .includes(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setFoundUsers(results);
        } else {
            setFoundUsers(listeDozenten);
            // If the text field is empty, show all users
        }

        setName(keyword);
    };
    return (
        <>
            <div className="mb-2 pr-1.5">
                <div className="border-b-2 border-solid border-mantineFg flex justify-between gap-4">
                    <input
                        type="search"
                        value={name}
                        onChange={filter}
                        className="w-full bg-mantineBg"
                        placeholder="Dozenten"
                    />
                    <Text className="pr-1" size="sm" color="dimmed">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Text>
                </div>
            </div>

            <ul className="grid gap-4">
                {foundUsers && foundUsers.length > 0 ? (
                    foundUsers
                        .sort((a, b) =>
                            a.nachname + a.vorname > b.nachname + b.vorname
                                ? 1
                                : -1
                        )
                        .map((item, index) => (
                            <Dozent key={index} item={item} />
                        ))
                ) : (
                    <Text size="sm" color="dimmed">
                        Es wurde kein Dozent gefunden!
                    </Text>
                )}
            </ul>
        </>
    );
}

function Dozent(props) {
    const [opened, setOpen] = useState(false);
    const notifications = useNotifications();

    //? Benachrichtungen beim Kopieren der Daten
    const showSuccess = (content) =>
        notifications.showNotification({
            title: "Kopieren erfolgreich",
            message:
                "'" +
                content +
                "' wurde erfolgreich in die Zwischenablage kopiert",
            color: "teal",
            icon: <FontAwesomeIcon icon={faCheck} />,
        });

    const showError = (err, content) =>
        notifications.showNotification({
            title: "Kopieren fehlgeschlage!",
            message: (
                <>
                    <p>'{content}' konnte nicht kopiert werden:</p>
                    <p>{err}</p>
                </>
            ),
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
                        <Text color="dimmed" size="xs" weight={500}>
                            {props.item.fach}
                        </Text>
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
