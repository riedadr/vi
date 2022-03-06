import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timeline, TimelineItem } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { useGroup } from "../contexts/gruppe";

export default function AktuellerTag(props) {
    const [stunden, setStunden] = useState([]);
    const { currentGroup } = useGroup();
    const [active, setActive] = useState(-1);

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
                start = "15:46";
                ende = "17:15";
                break;

            default:
                start = -1;
                ende = -1;
                break;
        }

        return start + " - " + ende;
    };

    useEffect(() => {
        progress(stunden);
    }, []);

    //markiert die aktuelle und bisherigen Stunden als besucht
    const progress = (stdArr) => {
        let now = new Date();
        let weekday = now.getDay();

        //Vergleich, ob heute der Tag ist, der angezeigt wird
        if (weekday === props.weekday) {
            let h = now.getHours();
            let m = now.getMinutes();
            let time = h * 60 + m;

            let aktStunde = -1;
            if (time > 0 && time <= 570) aktStunde = 1;
            if (time > 570 && time <= 675) aktStunde = 2;
            if (time > 675 && time <= 780) aktStunde = 3;
            if (time > 780 && time <= 930) aktStunde = 4;
            if (time > 930) aktStunde = 5;

            let fortschritt = stdArr.indexOf(aktStunde);
            setActive(fortschritt);
        }
    };

    return (
        <Timeline active={active} bulletSize={24} lineWidth={2}>
            {props.list.map((item, index) => {
                if (
                    item.titel.length !== 0 &&
                    (props.showAll || item.gruppe.includes(currentGroup))
                ) {
                    stunden.push(item.stunde);
                    return (
                        <TimelineItem key={index} bullet={item.stunde}>
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
                                            <FontAwesomeIcon icon={faLink} />
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
            })}
        </Timeline>
    );
}
