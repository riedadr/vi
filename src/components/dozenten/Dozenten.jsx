import {
    faAngleDown,
    faAngleUp,
    faCircleInfo,
    faEnvelope,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Collapse } from "@mantine/core";
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
    return (
        <li className="dozent mr-2">
            <button
                className="w-full flex gap-4 justify-between items-center"
                onClick={() => setOpen((o) => !o)}
            >
                <div className="flex gap-4 items-center">
                    <img className="profile-pic" src={props.item.bild} alt="" />
                    {props.item.titel} {props.item.vorname}{" "}
                    {props.item.nachname}
                </div>

                <FontAwesomeIcon icon={opened ? faAngleUp : faAngleDown} />
            </button>

            <Collapse in={opened} className="mt-2 bg-mantineFg rounded">
                <Button
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

                <Button
                    variant="subtle"
                    component="a"
                    href={"mailto:" + props.item.email}
                    target="_blank"
                    fullWidth
                    leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
                >
                    {props.item.email}
                </Button>

                <Button
                    variant="subtle"
                    color="green"
                    component="a"
                    href={"tel:" + props.item.tel}
                    target="_blank"
                    fullWidth
                    leftIcon={<FontAwesomeIcon icon={faPhone} />}
                >
                    {props.item.tel}
                </Button>
            </Collapse>
        </li>
    );
}
