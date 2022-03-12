import { useState } from "react";
import { Button, Collapse } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faAngleUp,
    faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { linksHAW } from "./linksHAW";
import { linksHföD } from "./linksHföD";

export default function Links() {
    const [haw, setHAW] = useState(false);
    const [hföd, setHföD] = useState(false);

    function LinkList(props) {
        return (
            <ul className="mt-2 bg-mantineFg rounded">
                {props.list.map((item, index) => {
                    return (
                        <li key={index}>
                            <Button
                                component="a"
                                href={item.link}
                                target="_blank"
                                className="w-full btn-text-left"
                                leftIcon={
                                    item.img ? (
                                        <img
                                            className="w-3.5"
                                            id="bw-icon"
                                            src={item.icon}
                                            alt=""
                                        />
                                    ) : (
                                        item.icon
                                    )
                                }
                            >
                                {item.name}
                            </Button>
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <>
            <div className="flex justify-between mt-2">
                <Button
                    className="w-full btn-text-left"
                    leftIcon={
                        <FontAwesomeIcon icon={haw ? faAngleUp : faAngleDown} />
                    }
                    onClick={() => setHAW((o) => !o)}
                >
                    HAW Hof
                </Button>
                <Button
                    component="a"
                    href="https://hof-university.de"
                    target="_blank"
                >
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </Button>
            </div>

            <Collapse in={haw}>
                <LinkList list={linksHAW} />
            </Collapse>

            <div className="flex justify-between mt-2">
                <Button
                    className="w-full btn-text-left"
                    leftIcon={
                        <FontAwesomeIcon
                            icon={hföd ? faAngleUp : faAngleDown}
                        />
                    }
                    onClick={() => setHföD((o) => !o)}
                >
                    HföD AIV
                </Button>
                <Button
                    component="a"
                    href="https://aiv.hfoed.de"
                    target="_blank"
                >
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </Button>
            </div>

            <Collapse in={hföd}>
                <LinkList list={linksHföD} />
            </Collapse>
        </>
    );
}
