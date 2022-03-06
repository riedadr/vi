import React, { useState, useEffect } from "react";
import { planMo } from "./stundenpläne/planMo";
import { planDi } from "./stundenpläne/planDi";
import { planMi } from "./stundenpläne/planMi";
import { planDo } from "./stundenpläne/planDo";
import { planFr } from "./stundenpläne/planFr";
import AktuellerTag from "./AktuellerTag";

export default function Aktuell() {
    const [loaded, setLoaded] = useState(false);
    const [currentList, setCurrentList] = useState([]);
    const [dayNr, setDayNr] = useState();
    const [day, setDay] = useState();

    useEffect(() => {
        const today = new Date();
        const weekday = today.getDay();
        setDayNr(weekday);
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
                setDayNr(1);
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
                
            </h2>
            {loaded && <AktuellerTag list={currentList} weekday={dayNr}/>}
        </>
    );
}
