import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useGroup } from "../../contexts/gruppe";
import { planDi } from "../stundenpläne/planDi";
import { planDo } from "../stundenpläne/planDo";
import { planFr } from "../stundenpläne/planFr";
import { planMi } from "../stundenpläne/planMi";
import { planMo } from "../stundenpläne/planMo";
import moodle from "../../images/moodle.png"


//? Gibt die Stunden der Woche als Tabelle aus (für große Bildschirme)
export default function StundenTabelle() {
    return (
        <div className="stundenTabelle tab-content">
            <div
                className="stundenTabelle-item"
                style={{ gridRow: 1, gridColumn: 1 }}
            >
                Zeit
            </div>
            <div>
                1.Stunde
                <p>8:00 - 9:30</p>
            </div>
            <div>
                2. Stunde
                <p>9:45 - 11:15</p>
            </div>
            <div>
                3. Stunde
                <p>11:30 - 13:00</p>
            </div>
            <div>
                4. Stunde
                <p>14:00 - 15:30</p>
            </div>
            <div>
                5. Stunde
                <p>15:45 - 17:15</p>
            </div>
            <div
                className="stundenTabelle-item"
                style={{ gridRow: 1, gridColumn: 2 }}
            >
                Montag
            </div>
            <Spalte list={planMo} col={1} />
            <div
                className="stundenTabelle-item"
                style={{ gridRow: 1, gridColumn: 3 }}
            >
                Dienstag
            </div>
            <Spalte list={planDi} col={2} />
            <div
                className="stundenTabelle-item"
                style={{ gridRow: 1, gridColumn: 4 }}
            >
                Mittwoch
            </div>
            <Spalte list={planMi} col={3} />
            <div
                className="stundenTabelle-item"
                style={{ gridRow: 1, gridColumn: 5 }}
            >
                Donnerstag
            </div>
            <Spalte list={planDo} col={4} />
            <div
                className="stundenTabelle-item"
                style={{ gridRow: 1, gridColumn: 6 }}
            >
                Freitag
            </div>
            <Spalte list={planFr} col={5} />
        </div>
    );
}

function Spalte(props) {
    return (
        <>
            {props.list.map((item, index) => {
                return <Fach item={item} key={index} col={props.col} />;
            })}
        </>
    );
}

function Fach(props) {
    const { currentGroup } = useGroup();

    return (
        <div
            id={
                props.item.gruppe.includes(currentGroup) &&
                props.item.titel.length > 0
                    ? "show"
                    : "hidden"
            }
            style={{
                gridRow: props.item.stunde + 1,
                gridColumn: props.col + 1,
            }}
        >
            <h2 className="flex justify-between">
                <span className="text-mantineAcc">
                    {props.item.kurz}{" "}
                    
                </span>

                {props.item.moodle && (
                    <a
                        href={props.item.moodle}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img className="h-4" src={moodle} alt="moodle" />
                    </a>
                )}
            </h2>
            <p>{props.item.raum}</p>
            <p>{props.item.dozent}</p>
        </div>
    );
}
