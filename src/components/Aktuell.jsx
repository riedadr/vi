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

    useEffect(() => {
        const today = new Date();
        let weekday = today.getDay();

        //nach 17:15 wird der nächste Tag angezeigt
        const h = today.getHours();
        const m = today.getMinutes();
        if (h * 60 + m >= 1035) weekday += 1;

        setDayNr(weekday);
        switch (weekday) {
            //Dienstag
            case 2:
                setCurrentList(planDi);
                setLoaded(true);
                break;
            //Mittwoch
            case 3:
                setCurrentList(planMi);
                setLoaded(true);
                break;
            //Donnerstag
            case 4:
                setCurrentList(planDo);
                setLoaded(true);
                break;
            //Freitag
            case 5:
                setCurrentList(planFr);
                setLoaded(true);
                break;
            //Samstag (6), Sonntag (0), Montag (1)
            default:
                setDayNr(1);
                setCurrentList(planMo);
                setLoaded(true);
                break;
        }
    }, []);
    return (
        <div className="tab-content">

            {loaded && <AktuellerTag list={currentList} weekday={dayNr} />}
        </div>
    );
}
