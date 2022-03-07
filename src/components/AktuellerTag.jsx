import {
    faAngleDoubleRight,
    faLink,
    faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timeline, TimelineItem } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { useGroup } from "../contexts/gruppe";
import { planMo } from "./stundenpläne/planMo";
import { planDi } from "./stundenpläne/planDi";
import { planMi } from "./stundenpläne/planMi";
import { planDo } from "./stundenpläne/planDo";
import { planFr } from "./stundenpläne/planFr";

export default function AktuellerTag(props) {
    const [weekday, setWeekday] = useState(props.weekday);
    const [currentList, setCurrentList] = useState(props.list);

    const [stunden] = useState([]);
    const { currentGroup } = useGroup();
    const [nächsterTag, setNächsterTag] = useState();
    const [minuten, setMinuten] = useState(0);
    const week = [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
    ];

    //Ausgeben der Zeiten anhand der Stundenzahl
    const getTime = (stunde) => {
        let start = "";
        let ende = "";

        switch (stunde) {
            case 1:
                start = "8:00";
                ende = "9:30";
                break;
            case 2:
                start = "9:45";
                ende = "11:15";
                break;
            case 3:
                start = "11:30";
                ende = "13:00";
                break;
            case 4:
                start = "14:00";
                ende = "15:30";
                break;
            case 5:
                start = "15:45";
                ende = "17:15";
                break;

            default:
                start = -1;
                ende = -1;
                break;
        }

        return start + " - " + ende;
    };

    const getTimeMinutes = (stunde) => {
        let minutes = 0;

        switch (stunde) {
            case 1:
                minutes = 480;
                break;
            case 2:
                minutes = 585;
                break;
            case 3:
                minutes = 690;
                break;
            case 4:
                minutes = 840;
                break;
            case 5:
                minutes = 945;
                break;

            default:
                minutes = -1;
                break;
        }

        return minutes;
    };

    useEffect(() => {
        setNächsterTag(week[weekday > 4 ? 1 : weekday + 1]);
        getMinuten();
        setInterval(() => {
            getMinuten();
        }, 60000);
    }, []);

    function getMinuten() {
        let now = new Date();
        let h = now.getHours();
        let m = now.getMinutes();

        let currentMinutes = h * 60 + m;

        //ab 17:15 wird ja der nächste Tag angezeigt, also werden die Stunden auch nicht mehr als aktiv angezeigt
        if (currentMinutes < 1035) {
            setMinuten(currentMinutes);
        }
    }

    const getNächsterTag = () => {
        if (weekday === 5) {
            setNächsterTag(week[2]);
        } else {
            setNächsterTag(week[weekday > 3 ? 1 : weekday + 2]);
        }
    };

    function updateList() {
        switch (weekday + 1) {
            //Dienstag
            case 2:
                setCurrentList(planDi);
                break;
            //Mittwoch
            case 3:
                setCurrentList(planMi);
                break;
            //Donnerstag
            case 4:
                setCurrentList(planDo);
                break;
            //Freitag
            case 5:
                setCurrentList(planFr);
                break;
            //Samstag (6), Sonntag (0), Montag (1)
            default:
                setCurrentList(planMo);
                break;
        }
    }

    return (
        <>
            <h2>{week[weekday]}</h2>
            <Timeline bulletSize={24} lineWidth={2}>
                {currentList.map((item, index) => {
                    if (
                        item.titel.length !== 0 &&
                        (props.showAll || item.gruppe.includes(currentGroup))
                    ) {
                        stunden.push(item.stunde);
                        return (
                            <TimelineItem
                                active={minuten >= getTimeMinutes(item.stunde)}
                                lineActive={
                                    minuten >= getTimeMinutes(item.stunde)
                                }
                                key={index}
                                bullet={item.stunde}
                                lineVariant="solid"
                            >
                                <p>{getTime(item.stunde)}</p>
                                <div className="bg-mantineBg rounded p-2">
                                    <h2 className="flex justify-between">
                                        <span className="text-mantineAcc">
                                            {item.titel}
                                        </span>
                                        {item.moodle && (
                                            <a
                                                href={item.moodle}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faLink}
                                                />
                                            </a>
                                        )}
                                    </h2>
                                    <p>
                                        in{" "}
                                        <span className="text-green-400">
                                            {item.raum}
                                        </span>{" "}
                                        bei{" "}
                                        <span className="text-green-400">
                                            {item.dozent}
                                        </span>
                                    </p>
                                </div>
                            </TimelineItem>
                        );
                    }
                    return null;
                })}
                <TimelineItem
                    active={minuten >= 1035}
                    lineActive={minuten >= 1035}
                    bullet={<FontAwesomeIcon icon={faAngleDoubleRight} />}
                >
                    <div className="flex justify-between w-full">
                        <button
                            className="w-full text-left hover:underline italic"
                            onClick={() => {
                                if (weekday >= 5) {
                                    setWeekday(1);
                                } else {
                                    setWeekday(weekday + 1);
                                }
                                updateList();
                                getNächsterTag();
                            }}
                        >
                            {nächsterTag}
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.reload();
                            }}
                        >
                            <FontAwesomeIcon icon={faRotateRight} />
                        </button>
                    </div>
                </TimelineItem>
            </Timeline>
        </>
    );
}
