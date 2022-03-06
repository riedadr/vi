import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Collapse } from "@mantine/core";
import React, { useState } from "react";
import { listeDozenten } from "./listeDozenten";

export default function Dozenten() {
    return (
        <>
            <ul className="grid gap-2">
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
        <li>
            <div className="flex gap-4 justify-between">
                <div className="flex gap-4 items-center">
                    <img className="profile-pic" src={props.item.bild} alt="" />
                    {props.item.titel} {props.item.vorname}{" "}
                    {props.item.nachname}
                </div>
                <Button onClick={() => setOpen((o) => !o)}>
                    <FontAwesomeIcon icon={opened ? faAngleUp : faAngleDown} />
                </Button>
                </div>

                <Collapse in={opened}>hi</Collapse>
            
        </li>
    );
}
