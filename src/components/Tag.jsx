import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useGroup } from "../contexts/gruppe";

export default function Tag(props) {
    const { currentGroup } = useGroup();

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

        return stunde + ". Stunde (" + start + " - " + ende + ")";
    };
    return (
        <ul className="grid gap-2">
            {props.list.map((item, index) => {
                if (
                    item.titel.length !== 0 &&
                    (props.showAll || item.gruppe.includes(currentGroup))
                ) {
                    return (
                        <li key={index}>
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
                        </li>
                    );
                }
                return null;
            })}
        </ul>
    );
}
