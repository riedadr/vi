import React, { useState, useEffect } from "react";
import { planMo } from "./stundenpläne/planMo";
import { planDi } from "./stundenpläne/planDi";
import { planMi } from "./stundenpläne/planMi";
import { planDo } from "./stundenpläne/planDo";
import { planFr } from "./stundenpläne/planFr";

import Tag from "./Tag";
import { Checkbox } from "@mantine/core";

export default function Aktuell() {
    const [loaded, setLoaded] = useState(false);
    const [currentList, setCurrentList] = useState([]);
    const [day, setDay] = useState();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const today = new Date();
        const weekday = today.getDay();
        switch (weekday) {
            //Dienstag
            case 2:
                setDay("Dienstag");
                setCurrentList(planDi);
                setLoaded(true);
                break;
            //Mittwoch
            case 3:
                setDay("Mittwoch");
                setCurrentList(planMi);
                setLoaded(true);
                break;
            //Donnerstag
            case 4:
                setDay("Donnerstag");
                setCurrentList(planDo);
                setLoaded(true);
                break;
            //Freitag
            case 5:
                setDay("Freitag");
                setCurrentList(planFr);
                setLoaded(true);
                break;
            //Samstag (6), Sonntag (0), Montag (1)
            default:
                setDay("Montag");
                setCurrentList(planMo);
                setLoaded(true);
                break;
        }
    }, []);
    return (
        <>
            <h2 className="flex justify-between">
                {day}
                <Checkbox className="flex-row-reverse gap-4"
                label="alle Gruppen"
                    checked={checked}
                    onChange={(event) =>
                        setChecked(event.currentTarget.checked)
                    }
                />
            </h2>
            {loaded && <Tag list={currentList} showAll={checked}/>}
        </>
    );
}
